import { knowledgeBaseApiSlice } from "../../../../../services/trEnglishApi/knowledgeBaseApiSlice";
import React, { useMemo, useState } from "react";
import { useGenerateTestTasks } from "../../../../../hooks/useGenerateTestTasks";
import { LearningCard } from "../../../../../components/LearningCard";
import { TestCard } from "../../../../../components/TestCard";
import { TrueOrFalseCard } from "../../../../../components/TrueOrFalseCard";
import { CommonButton } from "../../../../../components/CommonButton";

export const KBTests = () => {
  const tasksQuery = knowledgeBaseApiSlice.useGetTasksQuery(15);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCounter, setCorrectCounter] = useState(0);

  const [triggerCheckItem] = knowledgeBaseApiSlice.useCheckMutation();

  const onAnswer = (id: string) => (isRight: boolean) => {
    triggerCheckItem({ id: id, isRight: isRight ? "correct" : "wrong" });
  };

  const optimizedTestTasks = useMemo(() => {
    if (tasksQuery.isSuccess && !tasksQuery.isFetching && tasksQuery.data) {
      return {
        value: tasksQuery.data.map((item) => ({
          id: item.itemId,
          rus: item.rusWord,
          eng: item.engWord,
        })),
      };
    }
    return undefined;
  }, [tasksQuery]);

  const { tasks, quantity } = useGenerateTestTasks(optimizedTestTasks);
  const currentTask = tasks[currentIndex];

  return (
    <>
      {tasks.length > 0 && currentIndex < tasks.length && (
        <div>
          {currentTask.type === "learning" && (
            <LearningCard
              onAnswer={onAnswer(currentTask.data.id)}
              key={currentTask.data.id}
              engWord={currentTask.data.eng}
              rusWord={currentTask.data.rus}
              setCurrentIndex={setCurrentIndex}
              setCorrectCounter={setCorrectCounter}
              progressCounter={{
                currentIndex: currentIndex,
                total: quantity.current || 1,
              }}
            ></LearningCard>
          )}

          {currentTask.type === "test" && (
            <TestCard
              onAnswer={onAnswer(currentTask.question.id)}
              key={currentIndex}
              value={{
                question: currentTask.question,
                answers: currentTask.answers,
              }}
              total={quantity.current || 1}
              current={currentIndex}
              setCorrectAnswerCounter={setCorrectCounter}
              setCompletedTaskCounter={setCurrentIndex}
            ></TestCard>
          )}

          {currentTask.type === "trueOrFalse" && (
            <TrueOrFalseCard
              onAnswer={onAnswer(currentTask.id)}
              key={currentIndex}
              value={{
                value: currentTask.value,
                correct: currentTask.correct,
                fakeValue: currentTask.fakeValue,
                id: currentTask.id,
              }}
              total={quantity.current || 1}
              current={currentIndex}
              setCorrectAnswerCounter={setCorrectCounter}
              setCompletedTaskCounter={setCurrentIndex}
            ></TrueOrFalseCard>
          )}
        </div>
      )}

      {tasks && currentIndex === tasks.length && (
        <>
          <div>
            Вы повторили часть вашей базы знаний. Ваш результат:{" "}
            <span className="text-green-500">
              {`${correctCounter} из ${quantity.current}`}
            </span>
            . Можем позаниматься ещё, если есть желание :)
          </div>
          <CommonButton
            className="mt-3"
            onClick={() => {
              setCurrentIndex(0);
              setCorrectCounter(0);
              tasksQuery.refetch();
            }}
          >
            Учить ещё!
          </CommonButton>
        </>
      )}
    </>
  );
};
