import React from "react";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";
import { ButtonTheme, CommonButton } from "./CommonButton";

export const AnswerButton: React.FC<{
  value: string;
  userAnswer: string | boolean;
  correctAnswer: string | boolean;
  setCorrectAnswerCounter: React.Dispatch<React.SetStateAction<number>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  setCompletedTaskCounter: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}> = ({
  value,
  userAnswer,
  setCorrectAnswerCounter,
  setIsDisabled,
  isDisabled,
  setCompletedTaskCounter,
  correctAnswer,
  className,
}) => {
  return (
    <CommonButton
      className={className}
      disabled={isDisabled}
      onClick={(e) => {
        if (
          String(userAnswer).trim().toLowerCase() ===
          String(correctAnswer).trim().toLowerCase()
        ) {
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
      theme={ButtonTheme.outline}
    >
      {value}
    </CommonButton>
  );
};
