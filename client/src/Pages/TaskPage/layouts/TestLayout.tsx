import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { shuffle } from "../../../utils/utilsFunction";
import { CardValue } from "../../CreateTaskPage";
import { TrueOrFalseCard } from "../../../components/TrueOrFalseCard";
import { TestCard } from "../../../components/TestCard";
import { CommonButton } from "../../../components/CommonButton";
import { LearningCard } from "../../../components/LearningCard";
import { userApiSlice } from "../../../services/trEnglishApi/userApiSlice";
import { setTestComplete } from "../../../store/slices/currentTaskSlice";

export type TrueOrFalseItem = {
  value: string;
  fakeValue: string;
  correct: boolean;
};

export type TestItem = { question: CardValue; answers: CardValue[] };

export const TestLayout: React.FC = () => {
  const task = useAppSelector((state) => state.currentTaskReducer);
  const [trueOrFalse, setTrueOrFalse] = useState<TrueOrFalseItem[]>();
  const [test, setTest] = useState<TestItem[]>();
  const [learning, setLearning] = useState<CardValue[]>();
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
  const [completedTaskCounter, setCompletedTaskCounter] = useState(0);
  const dispatch = useAppDispatch();
  let quantity = useRef<number | null>(null);
  const [updateStudentTaskQuery] = userApiSlice.useUpdateStudentTaskMutation();

  useEffect(() => {
    if (task && completedTaskCounter === quantity.current) {
      dispatch(
        setTestComplete({
          complete: true,
          correctNumber: correctAnswerCounter,
        })
      );
      updateStudentTaskQuery({
        hash: task.hash,
        testComplete: true,
        testCorrectNumber: correctAnswerCounter,
      });
    }
  }, [task, completedTaskCounter]);

  useLayoutEffect(() => {
    if (task) {
      setCorrectAnswerCounter(task.testCorrectNumber);
    }
  }, [task]);

  useEffect(() => {
    const trueOrFalse: TrueOrFalseItem[] = [];
    const test: TestItem[] = [];
    const learning: CardValue[] = [];
    if (task) {
      quantity.current = Math.ceil(task.value.length / 3) * 3;
      const values = [...task.value];

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
  }, [task]);

  if (
    task &&
    trueOrFalse &&
    test &&
    learning &&
    quantity.current !== completedTaskCounter &&
    !task.testComplete
  ) {
    return (
      <div className="mt-3 mb-3">
        {/*True Or False*/}
        {trueOrFalse.map((item, idx) => {
          return (
            <TrueOrFalseCard
              key={`tof-${idx}`}
              setCorrectAnswerCounter={setCorrectAnswerCounter}
              value={item}
              setCompletedTaskCounter={setCompletedTaskCounter}
            ></TrueOrFalseCard>
          );
        })}

        {/*Test*/}
        {test.map((testItem, idx) => {
          return (
            <TestCard
              key={`test-${idx}`}
              value={testItem}
              setCorrectAnswerCounter={setCorrectAnswerCounter}
              setCompletedTaskCounter={setCompletedTaskCounter}
            ></TestCard>
          );
        })}

        {/*Learning*/}
        {learning.map((learningItem, idx) => {
          return (
            <LearningCard
              key={`learn-${idx}`}
              value={learningItem}
              setCorrectAnswerCounter={setCorrectAnswerCounter}
              setCompletedTaskCounter={setCompletedTaskCounter}
            ></LearningCard>
          );
        })}
      </div>
    );
  }
  if (
    task &&
    (completedTaskCounter === quantity.current || task.testCorrectNumber)
  ) {
    return (
      <div className="mt-3 mb-10 text-lg">
        <h2 className="text-2xl">Вы закончили учить все слова.</h2>
        <div className="mt-4 mb-4 ">
          <h3>Ваши результаты</h3>
          <p className="text-green-300">
            Вы правильно ответили на{" "}
            {`${correctAnswerCounter}/${quantity.current}`}
          </p>
        </div>
        <p>Хотите пройти заново?</p>
        <CommonButton
          onClick={() => {
            setCompletedTaskCounter(0);
            setCorrectAnswerCounter(0);
            dispatch(setTestComplete({ complete: false, correctNumber: 0 }));
            updateStudentTaskQuery({
              hash: task.hash,
              testComplete: false,
              testCorrectNumber: 0,
            });
          }}
          value="Повторить заново"
        ></CommonButton>
      </div>
    );
  }
  return <></>;
};
