import React, { useState } from "react";
import { AnswerButton } from "./AnswerButton";
import { TestItem } from "../Pages/TaskPage/StudentTaskPage/layouts/TestLayout";

export const TestCard: React.FC<{
  value: TestItem;
  setCorrectAnswerCounter: React.Dispatch<React.SetStateAction<number>>;
  setCompletedTaskCounter: React.Dispatch<React.SetStateAction<number>>;
}> = ({ value, setCorrectAnswerCounter, setCompletedTaskCounter }) => {
  const answer = value.question.eng;
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="test bg-cart-bg-dark mb-4 w-full min-h-[400px] lg:w-[70vw] h-[70vh] flex flex-col justify-between p-6 rounded-xl">
      <div className="">
        <h2>Термин</h2>
        <p className="text-3xl">{value.question.rus}</p>
      </div>
      <div>
        <p>Выберите правильный термин</p>
        <nav className="flex flex-wrap justify-center gap-3 mt-3">
          {value.answers.map((answerItem) => {
            return (
              <AnswerButton
                className="w-[45%]"
                setCorrectAnswerCounter={setCorrectAnswerCounter}
                key={answerItem.id}
                userAnswer={answerItem.eng}
                value={answerItem.eng}
                correctAnswer={answer}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                setCompletedTaskCounter={setCompletedTaskCounter}
              ></AnswerButton>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
