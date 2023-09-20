import React, { useEffect, useRef, useState } from "react";
import { CommonButton } from "../../../../components/CommonButton";
import { userApiSlice } from "../../../../services/trEnglishApi/userApiSlice";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../../../../utils/notificationUtilities";
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
  const answerInput = useRef<HTMLInputElement>(null);
  const timer = useRef<boolean>();

  function checkAnswer(eng: string, answer: string) {
    if (timer.current) return;
    timer.current = true;

    const defaultColor = answerInput.current!.style.backgroundColor;
    const compare =
      answer.trim().toLocaleLowerCase() === eng.toLowerCase().trim();
    answerInput.current!.disabled = true;

    if (compare) {
      setCounterValue((prev) => prev + 1);
      answerInput.current!.style.outlineColor = "#86efac";
      answerInput.current!.style.backgroundColor = "#b8f1cc";
      triggerSuccessNotification("Верно", 1000);
    } else {
      triggerWarningNotification("Неверно", 1000);
      answerInput.current!.style.outlineColor = "#ef4242";
      answerInput.current!.style.backgroundColor = "#ee7878";
    }

    setTimeout(() => {
      setCurrentIndex((prevState) => prevState + 1);
      answerInput.current!.style.outlineColor = "";
      answerInput.current!.style.backgroundColor = defaultColor;
      answerInput.current!.disabled = false;
      answerInput.current!.focus();
      timer.current = false;
    }, 1500);
    return compare;
  }

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
        engWord={taskData.value[currentIndex].eng}
        rusWord={taskData.value[currentIndex].rus}
        checkAnswer={checkAnswer}
        answerInputElement={answerInput}
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
