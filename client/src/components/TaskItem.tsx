import React from "react";

export const TaskItem: React.FC<{ name: string; date: string }> = ({
  name,
  date,
}) => {
  return (
    <li className="hover:bg-bg-input transition-colors cursor-pointer w-full flex justify-between items-center px-4 h-16 bg-cart-bg-dark mb-3 text-main-white rounded-xl">
      <h2 className=" font-bold text-xl">Название: {name}</h2>
      <h2 className="font-bold text-xl">Дата создания: {date}</h2>
    </li>
  );
};
