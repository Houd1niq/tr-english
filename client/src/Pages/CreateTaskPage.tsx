import React, { useState } from "react";
import WordsInput from "../components/WordsInput";
import { TeacherWordCard } from "../components/TeacherWordCard";
import { userApiSlice } from "../services/userApiSlice";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../components/CommonButton";
export type CardValue = {
  rus: string;
  eng: string;
  id: string;
};

const initialValues: CardValue[] = [
  { eng: "", rus: "", id: nanoid(3) },
  { eng: "", rus: "", id: nanoid(3) },
  { eng: "", rus: "", id: nanoid(3) },
  { eng: "", rus: "", id: nanoid(3) },
];

const CreateTaskPage: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [arrayOfWord, setArrayOfWord] = useState<CardValue[]>(initialValues);
  const [createTaskQuery] = userApiSlice.useCreateTaskMutation();
  const navigate = useNavigate();

  async function saveTaskHandler(
    values: CardValue[],
    taskName: string,
    hash: string
  ) {
    if (taskName.length === 0) {
      alert("Введите название задания");
      return;
    }
    if (values.length < 4) {
      alert("Задание должно содержать минимум 4 карточки");
      return;
    }

    // values = values.map((card) => {
    //   return {
    //     id: card.id,
    //     rus: card.rus.toLowerCase(),
    //     eng: card.eng.toLowerCase(),
    //   };
    // });

    const isValid = values.every((item) => {
      return item.eng.length > 0 && item.rus.length > 0;
    });
    if (!isValid) {
      alert("Не все карточки заполнены");
      return;
    }
    await createTaskQuery({ value: values, name: taskName, hash });
    alert("Задание успешно создано");
    navigate(`../task-info/${hash}`);
  }

  return (
    <div className="mb-10">
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
            <TeacherWordCard
              key={item.id}
              setArray={setArrayOfWord}
              idx={idx}
            ></TeacherWordCard>
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
      <CommonButton
        type="submit"
        value="Сохранить"
        onClick={() => {
          saveTaskHandler(arrayOfWord, taskName, nanoid(15));
        }}
      ></CommonButton>
    </div>
  );
};

export default CreateTaskPage;