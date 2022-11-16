import React from "react";
import { TUser } from "../../store/slices/authSlice";
import WordsInput from "../../components/WordsInput";

export const StudentLayout: React.FC<{ user: TUser }> = ({ user }) => {
  return (
    <>
      <WordsInput
        label="Получить задание по ссылке или по коду"
        name="link"
      ></WordsInput>
    </>
  );
};
