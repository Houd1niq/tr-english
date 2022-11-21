import React, { useState } from "react";
import { TUser } from "../../store/slices/authSlice";
import WordsInput from "../../components/WordsInput";
import { CommonButton } from "../../components/CommonButton";
import FormInput from "../../components/FormInput";
import { useNavigate } from "react-router-dom";

export const StudentLayout: React.FC<{ user: TUser }> = ({ user }) => {
  const [codeValue, setCodeValue] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="mt-2">
      <p>
        Вы можете найти задание по коду, который вам должен прислать учитель.
      </p>
      <input
        value={codeValue}
        className="w-52 h-7 rounded bg-bg-input p-2 mr-2 outline-none focus:outline-main-purple"
        placeholder="Введите код"
        type="text"
        onChange={(e) => setCodeValue(e.target.value)}
      />

      <CommonButton
        onClick={() => {
          navigate(`../task/${codeValue}`);
        }}
        value="Найти задание"
      ></CommonButton>
    </div>
  );
};
