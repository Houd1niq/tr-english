import React, { useRef, useState } from "react";
import { ButtonTheme, CommonButton } from "./CommonButton";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";

export const LearningCard: React.FC<{
  progressCounter?: {
    currentIndex: number;
    total: number;
  };
  engWord: string;
  rusWord: string;
  answerInputElement?: React.RefObject<HTMLInputElement>;
  checkAnswer: (eng: string, answer: string) => boolean | undefined;
}> = (props) => {
  const localAnswerInput = useRef<HTMLInputElement>(null);
  const [answer, setAnswer] = useState("");
  const { rusWord, engWord, checkAnswer, progressCounter, answerInputElement } =
    props;
  return (
    <div className="mt-4 w-100% lg:w-[70vw] min-h-[300px] h-[70vh]">
      <div className="card w-full rounded-xl bg-cart-bg-dark p-4 h-full flex flex-col justify-between">
        {progressCounter && (
          <h3 className="text-xl">
            {progressCounter.currentIndex + 1}/{progressCounter.total}
          </h3>
        )}
        <p className="text-4xl text-center">{rusWord}</p>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          <label htmlFor="answer">Введите ваш ответ</label>
          <input
            ref={answerInputElement ? answerInputElement : localAnswerInput}
            className="bg-bg-input p-1 mt-1 outline-none focus:outline-main-purple rounded"
            placeholder="Введите ответ (язык: Английский)"
            type="text"
            name="answer"
            value={answer}
            autoComplete="off"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <CommonButton
            onClick={() => {
              const res = checkAnswer(engWord, answer);
              if (localAnswerInput.current) {
                if (res) {
                  localAnswerInput.current.style.outlineColor = "#86efac";
                  localAnswerInput.current.style.backgroundColor = "#b8f1cc";
                  triggerSuccessNotification("Верно", 1000);
                } else if (res === false) {
                  localAnswerInput.current.style.outlineColor = "#ef4242";
                  localAnswerInput.current.style.backgroundColor = "#ee7878";
                  triggerWarningNotification("Неверно", 1000);
                }
                localAnswerInput.current.disabled = true;
              } else {
                setAnswer("");
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
