import React from "react";
import { BigLink } from "../../components/BigLink";

export const KnowledgeBasePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl text-center mb-2">База знаний</h1>
      <p>
        Добро пожаловать в базу знаний! Этот раздел позволит тебе создать
        собственный список слов, которые ты хотел бы выучить. Ты можешь добавить
        сюда слова, тренироваться в их запоминании, отслеживать статистику по
        количеству правильных и неправильных ответов, а также удалять из списка
        те слова, которые ты уже выучил.
      </p>
      <ul className="flex-col sm:flex-row flex gap-3 sm:gap-5 justify-center mb-4 mt-8">
        <li className={"w-full sm:w-[50%]"}>
          <BigLink to={"edit"}>Статистика и редактирование</BigLink>{" "}
        </li>
        <li className={"w-full sm:w-[50%]"}>
          <BigLink to={"check"}>Проверка знаний</BigLink>
        </li>
      </ul>
    </div>
  );
};
