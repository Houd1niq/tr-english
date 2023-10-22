import React from "react";
import { Link } from "react-router-dom";

export const BigLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
}> = ({ children, to, className }) => {
  return (
    <Link
      className={
        className +
        " text-center flex items-center duration-300 justify-center px-10 h-20 hover:bg-bg-input transition-colors rounded-xl text-xl bg-cart-bg-dark outline outline-main-purple"
      }
      to={to}
    >
      {children}
    </Link>
  );
};
