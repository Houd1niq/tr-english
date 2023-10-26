import React, { useState } from "react";
import { CommonButton } from "./CommonButton";

type CheckCardProps = {
  className?: string;
  children: React.ReactNode;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setCorrectCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const CheckCardContext = React.createContext<{
  setIsDone: (arg: boolean) => void;
  setCorrectAnswer: (arg: string) => void;
}>({
  setIsDone: () => {},
  setCorrectAnswer: () => {},
});

export const CheckCard: React.FC<CheckCardProps> = ({
  children,
  setCorrectCounter,
  setCurrentIndex,
}) => {
  const [isDone, setIsDone] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  return (
    <CheckCardContext.Provider value={{ setIsDone, setCorrectAnswer }}>
      <div className="relative overflow-hidden mb-5 rounded-xl">
        {children}
        {isDone !== null && (
          <div className="absolute bottom-0 left-0 w-full animate-cardCompletionInfoAnimation h-[50%] bg-cart-bg-dark">
            {isDone && (
              <div className="flex flex-col justify-center items-center h-full border border-green-500 rounded-b-2xl">
                <p className="text-2xl text-green-500 mb-2">Верно!</p>
                <CommonButton
                  autoFocus={true}
                  onClick={() => {
                    setCurrentIndex((prev) => prev + 1);
                    setCorrectCounter((prev) => prev + 1);
                  }}
                >
                  Дальше
                </CommonButton>
              </div>
            )}
            {!isDone && (
              <div className="flex flex-col justify-center items-center h-full border border-red-500 rounded-b-2xl">
                <p className="text-2xl text-red-500 mb-2">Неверно!</p>
                <p className="text-xl text-main-white mb-2">
                  Правильный ответ:{" "}
                  <span className="font-extrabold text-green-500">
                    {correctAnswer}
                  </span>
                </p>
                <CommonButton
                  autoFocus={true}
                  onClick={() => {
                    setCurrentIndex((prev) => prev + 1);
                  }}
                >
                  Дальше
                </CommonButton>
              </div>
            )}
          </div>
        )}
      </div>
    </CheckCardContext.Provider>
  );
};
