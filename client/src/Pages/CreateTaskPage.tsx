import React, { useCallback, useState } from "react";
import WordsInput from "../components/WordsInput";
import { WordCard } from "../components/WordCard";
import { userApiSlice } from "../services/userApiSlice";
import { nanoid } from "nanoid";
export type CardValue = {
  rus: string;
  eng: string;
  id: string;
};

const initialValues: CardValue[] = [
  { eng: "", rus: "", id: `id-${Math.random()}` },
  { eng: "", rus: "", id: `id-${Math.random()}` },
  { eng: "", rus: "", id: `id-${Math.random()}` },
];

const CreateTaskPage: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [arrayOfWord, setArrayOfWord] = useState<CardValue[]>(initialValues);
  const [createTaskQuery] = userApiSlice.useCreateTaskMutation();

  function saveTaskHandler(
    values: CardValue[],
    taskName: string,
    hash: string
  ) {
    if (taskName.length === 0) {
      alert("Введите название задания");
      return;
    }
    const isValid = values.every((item) => {
      return item.eng.length > 0 && item.rus.length > 0;
    });
    if (!isValid) {
      alert("Не все карточки заполнены");
      return;
    }
    createTaskQuery({ value: values, name: taskName, hash });
  }

  return (
    <div>
      <h1 className="text-4xl mb-8 text-center text-main-white mt-2 font-bold">
        Создание задания
      </h1>
      <WordsInput
        name="name"
        label="Название задания"
        placeholder="Название"
        getValue={setTaskName}
        value={taskName}
      ></WordsInput>
      <div className="mt-6">
        {arrayOfWord.map((item, idx) => {
          return (
            <WordCard
              key={item.id}
              setArray={setArrayOfWord}
              idx={idx}
            ></WordCard>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setArrayOfWord((prevState) => [
              ...prevState,
              { eng: "", rus: "", id: `id-${Math.random()}` },
            ]);
          }}
          className="bg-main-purple rounded-full text-main-white font-bold text-3xl w-10 h-10"
        >
          +
        </button>
      </div>
      <button
        onClick={() => {
          saveTaskHandler(arrayOfWord, taskName, nanoid(15));
        }}
      >
        Сохранить
      </button>
    </div>
  );
};

export default CreateTaskPage;
