import React from "react";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../components/CommonButton";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl">Страница не найдена</h2>
      <CommonButton onClick={() => navigate(-1)}>Вернуться назад</CommonButton>
    </div>
  );
};

export default NotFound;
