import { useEffect, useRef, useState } from "react";
import { CardValue } from "../Pages/CreateTaskPage";
import { shuffle } from "../utils/utilsFunction";
import {
  TestItem,
  TrueOrFalseItem,
} from "../Pages/TaskPage/StudentTaskPage/layouts/TestLayout";
import { TaskDto } from "../types";

export function useGenerateTestTasks(
  taskData: (TaskDto & { createdAt: string }) | undefined
) {
  const [trueOrFalse, setTrueOrFalse] = useState<TrueOrFalseItem[]>();
  const [test, setTest] = useState<TestItem[]>();
  const [learning, setLearning] = useState<CardValue[]>();
  let quantity = useRef<number | null>(null);

  useEffect(() => {
    const trueOrFalse: TrueOrFalseItem[] = [];
    const test: TestItem[] = [];
    const learning: CardValue[] = [];
    if (taskData) {
      quantity.current = Math.ceil(taskData.value.length / 3) * 3;
      const values = [...taskData.value];

      // True or False
      for (let i = 0; i < Math.ceil(values.length / 3); i++) {
        // True
        if (Math.random() > 0.5) {
          const correctIndex = Math.floor(Math.random() * values.length);
          trueOrFalse.push({
            correct: true,
            fakeValue: values[correctIndex].eng,
            value: values[correctIndex].rus,
          });
        } else {
          // False
          const correctIndex = Math.floor(Math.random() * values.length);
          let fakeIndex: number = correctIndex;
          while (fakeIndex === correctIndex) {
            fakeIndex = Math.floor(Math.random() * values.length);
          }
          trueOrFalse.push({
            correct: false,
            fakeValue: values[correctIndex].eng,
            value: values[fakeIndex].rus,
          });
        }
      }

      // Test
      let copyOfValuesForQuestions = [...values];
      for (let i = 0; i < Math.ceil(values.length / 3); i++) {
        let poolOfAnswers = [...values];
        let answers = [];
        const randomQuestionIndex = Math.floor(
          Math.random() * copyOfValuesForQuestions.length
        );
        const questionItem = copyOfValuesForQuestions.splice(
          randomQuestionIndex,
          1
        )[0];
        poolOfAnswers.splice(poolOfAnswers.indexOf(questionItem), 1);
        let copyOfValuesForAnswers = [...poolOfAnswers];
        for (let j = 0; j < 3; j++) {
          const randomAnswerIndex =
            Math.random() * copyOfValuesForAnswers.length;
          answers.push(copyOfValuesForAnswers.splice(randomAnswerIndex, 1)[0]);
        }
        answers.push(questionItem);
        answers = shuffle(answers);
        test.push({ question: questionItem, answers });
      }

      // Learning
      const copyOfValuesForLearning = [...values];
      for (let i = 0; i < Math.ceil(values.length / 3); i++) {
        const randomIndex = Math.floor(
          Math.random() * copyOfValuesForLearning.length
        );
        const learningItem = copyOfValuesForLearning.splice(randomIndex, 1)[0];
        learning.push(learningItem);
      }
    }
    setTest(test);
    setLearning(learning);
    setTrueOrFalse(trueOrFalse);
  }, [taskData]);
  return { trueOrFalse, test, learning, quantity };
}
