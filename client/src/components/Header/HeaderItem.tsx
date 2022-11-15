import React from "react";

export const HeaderItem: React.FC<{
  value: string;
  onClick: (...args: any) => any;
}> = ({ value, onClick }) => {
  return (
    <li
      onClick={onClick}
      className=" hover:before:w-full before:border-b cursor-pointer hover:text-main-purple transition-colors before:border-main-purple before:absolute before:transition-[width] before:w-0 before-content-[''] before:bottom-0 before: relative"
    >
      {value}
    </li>
  );
};
