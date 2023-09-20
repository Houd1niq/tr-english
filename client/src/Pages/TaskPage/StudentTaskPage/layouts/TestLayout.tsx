import React, { useEffect, useLayoutEffect, useState } from "react";
import { CardValue } from "../../../CreateTaskPage";
import { TrueOrFalseCard } from "../../../../components/TrueOrFalseCard";
import { TestCard } from "../../../../components/TestCard";
import { CommonButton } from "../../../../components/CommonButton";
import { userApiSlice } from "../../../../services/trEnglishApi/userApiSlice";
import { useLocation } from "react-router-dom";
import { useGenerateTestTasks } from "../../../../hooks/useGenerateTestTasks";
import { LearningCard } from "../../../../components/LearningCard";

export type TrueOrFalseItem = {
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
  const { test, trueOrFalse, quantity, learning } =
    useGenerateTestTasks(taskData);

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
    trueOrFalse &&
    test &&
    learning &&
    quantity.current !== completedTaskCounter &&
    !studentTaskData.testComplete
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
              engWord={learningItem.eng}
              rusWord={learningItem.rus}
              // answerInputElement={learningInput}
              checkAnswer={(eng, answer) => {
                const compare =
                  eng.trim().toLowerCase() === answer.trim().toLowerCase();
                if (compare) {
                  setCorrectAnswerCounter((prev) => prev + 1);
                }
                setCompletedTaskCounter((prev) => prev + 1);
                return compare;
              }}
            ></LearningCard>
          );
        })}
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
