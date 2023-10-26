import React, { useState } from "react";
import { TrueOrFalseItem } from "../Pages/TaskPage/StudentTaskPage/layouts/TestLayout";
import { AnswerButton } from "./AnswerButton";
import { CheckCard, CheckCardContext } from "./CheckCard";

type TrueOrFalseCardProps = {
  value: TrueOrFalseItem;
  setCorrectAnswerCounter: React.Dispatch<React.SetStateAction<number>>;
  setCompletedTaskCounter: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  current: number;
  onAnswer?: (isCorrect: boolean) => void;
};

const TrueOrFalseCardContent: React.FC<
  Omit<
    TrueOrFalseCardProps,
    "setCompletedTaskCounter" | "setCorrectAnswerCounter"
  >
> = ({ value, current, total, onAnswer }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const { setIsDone, setCorrectAnswer } = React.useContext(CheckCardContext);

  return (
    <div className="test bg-cart-bg-dark w-100% min-h-[300px] h-[70vh] flex flex-col p-3 rounded-xl">
      <div className="flex flex-col-reverse justify-end sm:flex-row sm:justify-between grow-[6]">
        <div className="w-full sm:w-[50%] pt-3 sm:pt-0 px-4">
          <h2>Определение</h2>
          <p className="text-2xl sm:text-3xl">{value.value}</p>
        </div>
        <div className="w-full sm:w-[50%] pb-3 sm:pb-0 border-b-2 sm:border-b-0 sm:border-l-2 px-4 border-bg-dark flex justify-between">
          <div>
            <h2>Термин</h2>
            <p className="text-2xl sm:text-3xl">{value.fakeValue}</p>
          </div>
          <h3 className="text-xl">
            {current + 1}/{total}
          </h3>
        </div>
      </div>
      <nav className="flex gap-2 mt-3">
        <AnswerButton
          className="w-[50%] h-12"
          onAnswer={onAnswer}
          setIsDone={setIsDone}
          setCorrectAnswer={setCorrectAnswer}
          correctAnswer={value.correct}
          userAnswer={true}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        >
          Верно
        </AnswerButton>
        <AnswerButton
          className="w-[50%] h-12"
          onAnswer={onAnswer}
          setIsDone={setIsDone}
          setCorrectAnswer={setCorrectAnswer}
          correctAnswer={value.correct}
          userAnswer={false}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        >
          Неверно
        </AnswerButton>
      </nav>
    </div>
  );
};

export const TrueOrFalseCard: React.FC<TrueOrFalseCardProps> = (props) => {
  return (
    <CheckCard
      setCurrentIndex={props.setCompletedTaskCounter}
      setCorrectCounter={props.setCorrectAnswerCounter}
    >
      <TrueOrFalseCardContent {...props} />
    </CheckCard>
  );
};
