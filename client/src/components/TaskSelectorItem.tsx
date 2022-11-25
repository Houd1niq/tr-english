import React from "react";
import { Link, useLocation } from "react-router-dom";

export const TaskSelectorItem: React.FC<{
  value: string;
  link: string;
}> = ({ value, link }) => {
  let defaultStyles =
    "text-xl bg-cart-bg-dark sm:w-40 h-10 rounded-md transition-colors hover:bg-bg-input w";
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  if (pathnameArray[pathnameArray.length - 1] === link) {
    defaultStyles += " text-main-purple";
  }
  return (
    <li className={defaultStyles}>
      <Link className="w-full h-full px-2 flex items-center" to={link}>
        {value}
      </Link>
    </li>
  );
};
