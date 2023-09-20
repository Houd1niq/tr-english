import React, { ButtonHTMLAttributes } from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

export enum ButtonTheme {
  purple = "purple",
  outline = "outline",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  onClick?: (...arg: any) => any;
  theme?: ButtonTheme;
  classNames?: string;
  children?: React.ReactNode;
}

export const CommonButton: React.FC<ButtonProps> = (props) => {
  const {
    children,
    type,
    onClick,
    theme = ButtonTheme.purple,
    className,
  } = props;
  let themeClassNames = "";
  if (theme === ButtonTheme.outline) {
    themeClassNames =
      "hover:bg-light-gray outline-none bg-bg-input rounded-xl border-main-purple border ";
  } else if (theme === ButtonTheme.purple) {
    themeClassNames =
      "hover:shadow-main-purple hover:shadow-roundShadow transition-shadow text-main-white bg-main-purple rounded-xl";
  }
  return (
    <button
      {...props}
      onClick={onClick}
      type={type}
      className={`${themeClassNames} ${className} min-h-10 py-1.5 px-3`}
    >
      {children}
    </button>
  );
};
