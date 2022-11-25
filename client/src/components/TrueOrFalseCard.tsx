import React, { useState } from "react";
import { TrueOrFalseItem } from "../Pages/TaskPage/TestLayout";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";

export const TrueOrFalseCard: React.FC<{
  value: TrueOrFalseItem;
  setCorrectAnswerCounter: React.Dispatch<React.SetStateAction<number>>;
  setCompletedTaskCounter: React.Dispatch<React.SetStateAction<number>>;
}> = ({ value, setCorrectAnswerCounter, setCompletedTaskCounter }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="test bg-cart-bg-dark w-100% lg:w-[70vw] min-h-[300px] h-[70vh] flex flex-col p-3 rounded-xl mb-4">
      <div className="flex justify-between grow-[6]">
        <div className="w-[50%] border-r-2 px-4 border-bg-dark">
          <h2>Термин</h2>
          <p className="text-3xl">{value.value}</p>
        </div>
        <div className="w-[50%] px-4">
          <h2>Определение</h2>
          <p className="text-3xl">{value.fakeValue}</p>
        </div>
      </div>
      <nav className="flex gap-2 mt-3">
        <button
          disabled={isDisabled}
          onClick={() => {
            if (value.correct) {
              setCorrectAnswerCounter((prev) => prev + 1);
              triggerSuccessNotification("Правильно!", 2000);
            } else triggerWarningNotification("Неправильно!", 2000);
            setIsDisabled(true);
            setCompletedTaskCounter((prev) => prev + 1);
          }}
          className="px-3 py-2 outline-none bg-bg-input rounded-xl border-main-purple border hover:bg-light-gray"
        >
          Верно
        </button>
        <button
          disabled={isDisabled}
          onClick={() => {
            if (!value.correct) {
              setCorrectAnswerCounter((prev) => prev + 1);
              triggerSuccessNotification("Правильно!", 2000);
            } else triggerWarningNotification("Неправильно!", 2000);
            setIsDisabled(true);
            setCompletedTaskCounter((prev) => prev + 1);
          }}
          className="px-3 py-2 outline-none bg-bg-input rounded-xl border-main-purple border hover:bg-light-gray"
        >
          Неверно
        </button>
      </nav>
    </div>
  );
};
