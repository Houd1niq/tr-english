import React, { useEffect } from "react";
import { knowledgeBaseApiSlice } from "../../../../services/trEnglishApi/knowledgeBaseApiSlice";
import { TaskSelectorItem } from "../../../../components/TaskSelectorItem";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Roller } from "react-spinners-css";

export const KnowledgeBaseCheckPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");

  const { isSuccess } = knowledgeBaseApiSlice.useGetTasksQuery(15);

  useEffect(() => {
    if (
      pathname[pathname.length - 1] !== "cards" &&
      pathname[pathname.length - 1] !== "test" &&
      pathname[pathname.length - 1] !== "learning"
    ) {
      navigate("cards");
    }
  }, []);

  if (isSuccess) {
    return (
      <>
        <h2 className="text-3xl mt-3 font-bold">База знаний</h2>
        <nav className="mt-5 mb-5">
          <ul className="flex gap-4 flex-col sm:flex-row items-stretch">
            <TaskSelectorItem value="Карточки" link="cards"></TaskSelectorItem>
            <TaskSelectorItem value="Тест" link="test"></TaskSelectorItem>
          </ul>
        </nav>
        <Outlet></Outlet>
      </>
    );
  }
  return <Roller />;
};
