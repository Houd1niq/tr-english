import React, { useEffect } from "react";
import { userApiSlice } from "../../services/userApiSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Roller } from "react-spinners-css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setCurrentTask, setUserInfo } from "../../store/slices/authSlice";
import { TaskSelectorItem } from "../../components/TaskSelectorItem";
import { useWhyDidYouUpdate } from "ahooks/es";

export const TaskPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const hashUrl = pathname[2];
  const dispatch = useAppDispatch();
  const [getOneTaskQuery, taskQueryResult] =
    userApiSlice.useLazyGetOneTaskQuery();

  useEffect(() => {
    getOneTaskQuery(hashUrl);
  }, []);

  useEffect(() => {
    if (taskQueryResult.isSuccess && taskQueryResult.currentData) {
      dispatch(setCurrentTask(taskQueryResult.currentData));
    }
    if (
      pathname[pathname.length - 1] !== "cards" &&
      pathname[pathname.length - 1] !== "test" &&
      pathname[pathname.length - 1] !== "learning"
    ) {
      navigate("cards");
    }
  }, [taskQueryResult]);

  if (taskQueryResult.isSuccess && taskQueryResult.currentData) {
    return (
      <>
        <h2 className="text-3xl font-bold">
          {taskQueryResult.currentData.name}
        </h2>
        <nav className="mt-5">
          <ul className="flex gap-4">
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
