import React, { useRef, useState } from "react";
import { CardValue } from "../Pages/CreateTaskPage";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";

export const LearningCard: React.FC<{
  value: CardValue;
  setCorrectAnswerCounter: React.Dispatch<React.SetStateAction<number>>;
  setCompletedTaskCounter: React.Dispatch<React.SetStateAction<number>>;
}> = ({ value, setCorrectAnswerCounter, setCompletedTaskCounter }) => {
  const [answerValue, setAnswerValue] = useState("");
  const answerInput = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  function checkAnswer(answer: string) {
    if (value.eng.toLocaleLowerCase() === answer.toLowerCase().trim()) {
      triggerSuccessNotification("Верно", 2000);
      answerInput.current!.style.outlineColor = "#86efac";
      answerInput.current!.style.backgroundColor = "#b8f1cc";
      setCorrectAnswerCounter((prev) => prev + 1);
    } else {
      triggerWarningNotification("Неверно", 2000);
      answerInput.current!.style.outlineColor = "#ef4242";
      answerInput.current!.style.backgroundColor = "#ee7878";
    }
    setIsDisabled(true);
    setCompletedTaskCounter((prev) => prev + 1);
  }

  return (
    <div className="mt-4 w-100% lg:w-[70vw] min-h-[300px] h-[70vh]">
      <div className="card w-full rounded-xl bg-cart-bg-dark p-4 h-full flex flex-col justify-between">
        <p className="text-4xl text-center">{value.rus}</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
          <label htmlFor="answer">Введите ваш ответ</label>
          <input
            ref={answerInput}
            disabled={isDisabled}
            className="bg-bg-input p-1 mt-1 outline-none focus:outline-main-purple rounded"
            placeholder="Введите ответ (язык: Английский)"
            type="text"
            name="answer"
            autoComplete="off"
            value={answerValue}
            onChange={(e) => {
              setAnswerValue(e.target.value);
            }}
          />
          <button
            disabled={isDisabled}
            onClick={() => {
              checkAnswer(answerValue);
            }}
            className="hover:bg-light-gray px-3 mt-3 py-2 outline-none bg-bg-input rounded-xl border-main-purple border "
          >
            Ответить
          </button>
        </form>
      </div>
    </div>
  );
};
