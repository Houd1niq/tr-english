import React, { useState } from "react";
import { TestItem } from "../Pages/TaskPage/StudentTaskPage/layouts/TestLayout";
import { CheckCard, CheckCardContext } from "./CheckCard";
import { AnswerButton } from "./AnswerButton";

type TestCardProps = {
  value: TestItem;
  setCorrectAnswerCounter: React.Dispatch<React.SetStateAction<number>>;
  setCompletedTaskCounter: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  current: number;
  onAnswer?: (isCorrect: boolean) => void;
};

const TestCardContent: React.FC<
  Omit<TestCardProps, "setCompletedTaskCounter" | "setCorrectAnswerCounter">
> = ({ value, current, total, onAnswer }) => {
  const answer = value.question.eng;
  const [isDisabled, setIsDisabled] = useState(false);

  const { setIsDone, setCorrectAnswer } = React.useContext(CheckCardContext);

  return (
    <div className="test bg-cart-bg-dark w-full min-h-[400px] h-[70vh] flex flex-col justify-between p-6 rounded-xl">
      <div className="flex justify-between">
        <div>
          <h2>Термин</h2>
          <p className="text-xl sm:text-3xl">{value.question.rus}</p>
        </div>
        <h3 className="text-xl">
          {current + 1}/{total}
        </h3>
      </div>
      <div>
        <p>Выберите правильный термин</p>
        <nav className="flex flex-wrap justify-center sm:gap-3 gap-2 mt-3">
          {value.answers.map((answerItem) => {
            return (
              <AnswerButton
                onAnswer={onAnswer}
                setIsDone={setIsDone}
                setCorrectAnswer={setCorrectAnswer}
                className="w-[45%]"
                key={answerItem.id}
                userAnswer={answerItem.eng}
                correctAnswer={answer}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
              >
                {answerItem.eng}
              </AnswerButton>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export const TestCard: React.FC<TestCardProps> = (props) => {
  return (
    <CheckCard
      setCurrentIndex={props.setCompletedTaskCounter}
      setCorrectCounter={props.setCorrectAnswerCounter}
    >
      <TestCardContent {...props} />
    </CheckCard>
  );
};
