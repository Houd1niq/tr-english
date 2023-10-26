import React, { useEffect, useLayoutEffect, useState } from "react";
import { CardValue } from "../../../CreateTaskPage";
import { CommonButton } from "../../../../components/CommonButton";
import { userApiSlice } from "../../../../services/trEnglishApi/userApiSlice";
import { useLocation } from "react-router-dom";
import { useGenerateTestTasks } from "../../../../hooks/useGenerateTestTasks";
import { LearningCard } from "../../../../components/LearningCard";
import { TestCard } from "../../../../components/TestCard";
import { TrueOrFalseCard } from "../../../../components/TrueOrFalseCard";

export type TrueOrFalseItem = {
  id: string;
  value: string;
  fakeValue: string;
  correct: boolean;
};

export type TestItem = { question: CardValue; answers: CardValue[] };

export const TestLayout: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const hashUrl = pathname[2];

  const { data: studentTaskData } =
    userApiSlice.useGetStudentTaskQuery(hashUrl);
  const [updateStudentTaskQuery] = userApiSlice.useUpdateStudentTaskMutation();
  const { data: taskData } = userApiSlice.useGetOneTaskQuery(hashUrl);

  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
  const [completedTaskCounter, setCompletedTaskCounter] = useState(0);
  const { tasks, quantity } = useGenerateTestTasks(taskData);

  useEffect(() => {
    if (completedTaskCounter === quantity.current) {
      updateStudentTaskQuery({
        hash: hashUrl,
        testComplete: true,
        testCorrectNumber: correctAnswerCounter,
      });
    }
  }, [completedTaskCounter, quantity.current]);

  useLayoutEffect(() => {
    if (studentTaskData) {
      setCorrectAnswerCounter(studentTaskData.testCorrectNumber);
    }
  }, [studentTaskData]);

  if (
    studentTaskData &&
    tasks.length > 0 &&
    quantity.current !== completedTaskCounter &&
    !studentTaskData.testComplete
  ) {
    const currentTask = tasks[completedTaskCounter];
    return (
      <div className="mb-3">
        {currentTask.type === "learning" && (
          <LearningCard
            key={currentTask.data.id}
            engWord={currentTask.data.eng}
            rusWord={currentTask.data.rus}
            setCurrentIndex={setCompletedTaskCounter}
            setCorrectCounter={setCorrectAnswerCounter}
            progressCounter={{
              currentIndex: completedTaskCounter,
              total: quantity.current || 1,
            }}
          ></LearningCard>
        )}

        {currentTask.type === "test" && (
          <TestCard
            key={completedTaskCounter}
            value={{
              question: currentTask.question,
              answers: currentTask.answers,
            }}
            total={quantity.current || 1}
            current={completedTaskCounter}
            setCorrectAnswerCounter={setCorrectAnswerCounter}
            setCompletedTaskCounter={setCompletedTaskCounter}
          ></TestCard>
        )}

        {currentTask.type === "trueOrFalse" && (
          <TrueOrFalseCard
            key={completedTaskCounter}
            value={{
              value: currentTask.value,
              correct: currentTask.correct,
              fakeValue: currentTask.fakeValue,
              id: currentTask.id,
            }}
            total={quantity.current || 1}
            current={completedTaskCounter}
            setCorrectAnswerCounter={setCorrectAnswerCounter}
            setCompletedTaskCounter={setCompletedTaskCounter}
          ></TrueOrFalseCard>
        )}
      </div>
    );
  }
  if (
    studentTaskData &&
    (completedTaskCounter === quantity.current ||
      studentTaskData.testCorrectNumber)
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
            updateStudentTaskQuery({
              hash: hashUrl,
              testComplete: false,
              testCorrectNumber: 0,
            });
          }}
        >
          Повторить заново
        </CommonButton>
      </div>
    );
  }
  return <></>;
};
