import React, { useEffect, useState } from "react";
import { CommonButton } from "../../../../components/CommonButton";
import { userApiSlice } from "../../../../services/trEnglishApi/userApiSlice";

import { useLocation } from "react-router-dom";
import { LearningCard } from "../../../../components/LearningCard";

export const LearningLayout: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const hashUrl = pathname[2];

  const { data: studentTaskData } =
    userApiSlice.useGetStudentTaskQuery(hashUrl);
  const { data: taskData } = userApiSlice.useGetOneTaskQuery(hashUrl);
  const [updateStudentTaskQuery] = userApiSlice.useUpdateStudentTaskMutation();

  const [counter, setCounterValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (studentTaskData) {
      setCounterValue(studentTaskData.learnCorrectNumber);
    }
  }, [studentTaskData]);

  useEffect(() => {
    if (taskData && currentIndex === taskData.value.length) {
      updateStudentTaskQuery({
        hash: hashUrl,
        learningComplete: true,
        learnCorrectNumber: counter,
      });
    }
  }, [taskData, currentIndex]);

  if (
    taskData &&
    currentIndex < taskData.value.length &&
    studentTaskData &&
    !studentTaskData.learningComplete
  ) {
    return (
      <LearningCard
        key={currentIndex}
        engWord={taskData.value[currentIndex].eng}
        rusWord={taskData.value[currentIndex].rus}
        setCurrentIndex={setCurrentIndex}
        setCorrectCounter={setCounterValue}
        progressCounter={{
          currentIndex,
          total: taskData.value.length,
        }}
      />
    );
  } else if (
    taskData &&
    studentTaskData &&
    (currentIndex === taskData.value.length || studentTaskData.learningComplete)
  ) {
    return (
      <div className="mt-3 mb-10 text-lg">
        <h2 className="text-2xl">Вы закончили учить все слова.</h2>
        <div className="mt-4 mb-4 ">
          <h3>Ваши результаты</h3>
          <p className="text-green-300">
            Вы правильно ответили на {`${counter}/${taskData.value.length}`}
          </p>
        </div>
        <p>Хотите пройти заново?</p>
        <CommonButton
          onClick={() => {
            setCurrentIndex(0);
            updateStudentTaskQuery({
              hash: hashUrl,
              learningComplete: false,
              learnCorrectNumber: 0,
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
