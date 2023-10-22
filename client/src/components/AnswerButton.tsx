import React from "react";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";
import { ButtonTheme, CommonButton } from "./CommonButton";

type AnswerButtonProps = {
  userAnswer: string | boolean;
  correctAnswer: string | boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  setIsDone: (arg: boolean) => void;
  setCorrectAnswer: (arg: string) => void;
  className?: string;
  children?: React.ReactNode;
  onAnswer?: (isCorrect: boolean) => void;
};

export const AnswerButton: React.FC<AnswerButtonProps> = (props) => {
  const {
    children,
    userAnswer,
    setIsDisabled,
    isDisabled,
    correctAnswer,
    className,
    setCorrectAnswer,
    setIsDone,
    onAnswer,
  } = props;

  return (
    <CommonButton
      className={className}
      disabled={isDisabled}
      onClick={(e) => {
        const res =
          String(userAnswer).trim().toLowerCase() ===
          String(correctAnswer).trim().toLowerCase();
        setIsDone(res);
        setCorrectAnswer(String(correctAnswer));
        onAnswer?.(res);
        if (res) {
          triggerSuccessNotification("Правильно!", 2000);
          e.currentTarget.classList.add("bg-green-300");
        } else {
          e.currentTarget.classList.add("bg-red-300");
          triggerWarningNotification("Неправильно!", 2000);
        }
        setIsDisabled(true);
        e.currentTarget.classList.remove("hover:bg-light-gray");
        e.currentTarget.classList.remove("bg-bg-input");
      }}
      theme={ButtonTheme.outline}
    >
      {children}
    </CommonButton>
  );
};
