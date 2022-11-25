import React from "react";
export const TaskItemInProfile: React.FC<{
  name: string;
  date: string;
  onClick: (...args: any) => any;
}> = ({ name, date, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="hover:bg-bg-input flex-col sm:flex-row pb-2 transition-colors cursor-pointer w-full flex justify-between items-center py-2 px-4 min-h-[64px] bg-cart-bg-dark mb-3 text-main-white rounded-xl"
    >
      <h2 className=" font-bold text-xl">Название: {name}</h2>
      <h2 className="font-bold text-xl text-center">Дата создания: {date}</h2>
    </li>
  );
};
