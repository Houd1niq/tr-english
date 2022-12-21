import React from "react";
import { CardValue } from "../Pages/CreateTaskPage";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";

export const AnswerButton: React.FC<{
  answerItem: CardValue;
  correctAnswer: string;
  setCorrectAnswerCounter: React.Dispatch<React.SetStateAction<number>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  setCompletedTaskCounter: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  answerItem,
  correctAnswer,
  setCorrectAnswerCounter,
  setIsDisabled,
  isDisabled,
  setCompletedTaskCounter,
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={(e) => {
        if (answerItem.eng === correctAnswer) {
          setCorrectAnswerCounter((prev) => prev + 1);
          triggerSuccessNotification("Правильно!", 2000);
          e.currentTarget.classList.add("bg-green-300");
        } else {
          e.currentTarget.classList.add("bg-red-300");
          triggerWarningNotification("Неправильно!", 2000);
        }
        setIsDisabled(true);
        e.currentTarget.classList.remove("hover:bg-light-gray");
        e.currentTarget.classList.remove("bg-bg-input");
        setCompletedTaskCounter((prev) => prev + 1);
      }}
      className="px-3 py-2 w-full hover:bg-light-gray sm:w-[48%] outline-none bg-bg-input rounded-xl border-main-purple border "
    >
      {answerItem.eng}
    </button>
  );
};
