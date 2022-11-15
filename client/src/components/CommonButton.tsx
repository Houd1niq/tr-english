import React, { ButtonHTMLAttributes } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

export const CommonButton: React.FC<{
  value?: string;
  type?: ButtonType;
  onClick?: (...arg: any) => any;
}> = ({ value, type, onClick: onClickFn }) => {
  return (
    <button
      onClick={onClickFn}
      type={type}
      className="text-main-white bg-main-purple w-auto px-3 h-10 rounded-xl mt-2"
    >
      {value}
    </button>
  );
};
