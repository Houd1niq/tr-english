import React, { useEffect } from "react";
import { userApiSlice } from "../../../services/trEnglishApi/userApiSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Roller } from "react-spinners-css";
import { TaskSelectorItem } from "../../../components/TaskSelectorItem";

export const StudentTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const hashUrl = pathname[2];
  const [getOneTaskQuery, taskQueryResult] =
    userApiSlice.useLazyGetOneTaskQuery();

  useEffect(() => {
    getOneTaskQuery(hashUrl);
    if (
      pathname[pathname.length - 1] !== "cards" &&
      pathname[pathname.length - 1] !== "test" &&
      pathname[pathname.length - 1] !== "learning"
    ) {
      navigate("cards");
    }
  }, []);

  if (taskQueryResult.isSuccess && taskQueryResult.currentData) {
    return (
      <>
        <h2 className="text-3xl mt-3 font-bold">
          {taskQueryResult.currentData.name}
        </h2>
        <nav className="mt-5">
          <ul className="flex gap-4 flex-col sm:flex-row items-stretch">
            <TaskSelectorItem value="Карточки" link="cards"></TaskSelectorItem>
            <TaskSelectorItem
              value="Заучивание"
              link="learning"
            ></TaskSelectorItem>
            <TaskSelectorItem value="Тест" link="test"></TaskSelectorItem>
          </ul>
        </nav>
        <Outlet></Outlet>
      </>
    );
  }
  return <Roller></Roller>;
};
