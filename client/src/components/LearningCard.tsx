import React, { useContext, useRef, useState } from "react";
import { ButtonTheme, CommonButton } from "./CommonButton";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";
import { CheckCard, CheckCardContext } from "./CheckCard";

type LearningCardProps = {
  progressCounter: {
    currentIndex: number;
    total: number;
  };
  engWord: string;
  rusWord: string;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setCorrectCounter: React.Dispatch<React.SetStateAction<number>>;
  onAnswer?: (isCorrect: boolean) => void;
};

const LearningCardContent: React.FC<LearningCardProps> = (props) => {
  const localAnswerInput = useRef<HTMLInputElement>(null);
  const [answer, setAnswer] = useState("");
  const { rusWord, engWord, progressCounter, onAnswer } = props;

  const { setIsDone, setCorrectAnswer } = useContext(CheckCardContext);

  return (
    <div className="w-100% min-h-[300px] h-[70vh]">
      <div className="card w-full rounded-xl bg-cart-bg-dark p-4 h-full flex flex-col justify-between">
        <h3 className="text-xl">
          {progressCounter.currentIndex + 1}/{progressCounter.total}
        </h3>
        <p className="text-xl sm:text-4xl text-center">{rusWord}</p>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          <label htmlFor="answer">Введите ваш ответ</label>
          <input
            ref={localAnswerInput}
            className="bg-bg-input p-1 mt-1 outline-none focus:outline-main-purple rounded"
            placeholder="Введите ответ (язык: Английский)"
            type="text"
            name="answer"
            value={answer}
            autoComplete="off"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <CommonButton
            onClick={(e) => {
              e.currentTarget.disabled = true;
              const res =
                answer.trim().toLowerCase() === engWord.trim().toLowerCase();
              onAnswer?.(res);
              setIsDone(res);
              setCorrectAnswer(engWord);

              if (localAnswerInput.current) {
                if (res) {
                  localAnswerInput.current.style.outlineColor = "#86efac";
                  localAnswerInput.current.style.backgroundColor = "#b8f1cc";
                  triggerSuccessNotification("Верно", 1000);
                } else if (!res) {
                  localAnswerInput.current.style.outlineColor = "#ef4242";
                  localAnswerInput.current.style.backgroundColor = "#ee7878";
                  triggerWarningNotification("Неверно", 1000);
                }
                localAnswerInput.current.disabled = true;
              } else {
                // setAnswer("");
              }
            }}
            theme={ButtonTheme.outline}
            type="submit"
            className={"mt-2"}
          >
            Ответить
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export const LearningCard: React.FC<LearningCardProps> = (props) => {
  const { setCurrentIndex, setCorrectCounter } = props;

  return (
    <CheckCard
      setCorrectCounter={setCorrectCounter}
      setCurrentIndex={setCurrentIndex}
    >
      <LearningCardContent {...props}></LearningCardContent>
    </CheckCard>
  );
};
