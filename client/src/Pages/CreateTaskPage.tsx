import React, { useState } from "react";
import WordsInput from "../components/WordsInput";
import { TeacherWordCard } from "../components/TeacherWordCard";
import { userApiSlice } from "../services/trEnglishApi/userApiSlice";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../components/CommonButton";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";
import { firstLetterToUppercase } from "../utils/utilsFunction";
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
    if (taskName.length < 4) {
      triggerWarningNotification(
        "Название задание долнжо содержать минимум 4 символа"
      );
      return;
    }
    if (values.length < 4) {
      triggerWarningNotification("Задание должно содержать минимум 4 карточки");
      return;
    }

    const isValid = values.every((item) => {
      return item.eng.length > 0 && item.rus.length > 0;
    });
    if (!isValid) {
      triggerWarningNotification("Не все карточки заполнены");
      return;
    }
    await createTaskQuery({
      value: values,
      name: firstLetterToUppercase(taskName),
      hash,
    });
    triggerSuccessNotification("Задание успешно создано");
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
        placeholder="Введите название"
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
              { eng: "", rus: "", id: nanoid(3) },
            ]);
          }}
          className="bg-main-purple rounded-full text-main-white font-bold text-3xl w-10 h-10"
        >
          +
        </button>
      </div>
      <CommonButton
        type="submit"
        onClick={() => {
          saveTaskHandler(arrayOfWord, taskName, nanoid(15));
        }}
      >
        Сохранить
      </CommonButton>
    </div>
  );
};

export default CreateTaskPage;
