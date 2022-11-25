import React, { useEffect } from "react";
import { userApiSlice } from "../../services/userApiSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Roller } from "react-spinners-css";
import { useAppDispatch } from "../../store/store";
import {
  setCardsComplete,
  setCurrentTask,
  setLearningComplete,
  setTestComplete,
} from "../../store/slices/authSlice";
import { TaskSelectorItem } from "../../components/TaskSelectorItem";

export const TaskPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const hashUrl = pathname[2];
  const dispatch = useAppDispatch();
  const [getOneTaskQuery, taskQueryResult] =
    userApiSlice.useLazyGetOneTaskQuery();
  const [addStudentTask, studentTaskResponse] =
    userApiSlice.useAddStudentTaskMutation();
  useEffect(() => {
    getOneTaskQuery(hashUrl);
  }, []);

  useEffect(() => {
    if (studentTaskResponse.status === "fulfilled") {
      const data = studentTaskResponse.data;
      dispatch(setCardsComplete(data.cardsComplete));
      dispatch(
        setLearningComplete({
          complete: data.learningComplete,
          correctNumber: data.learnCorrectNumber,
        })
      );
      dispatch(
        setTestComplete({
          complete: data.testComplete,
          correctNumber: data.testCorrectNumber,
        })
      );
    }
  }, [studentTaskResponse.status]);

  useEffect(() => {
    if (taskQueryResult.isSuccess && taskQueryResult.currentData) {
      const data = taskQueryResult.currentData;
      dispatch(
        setCurrentTask({ hash: data.hash, name: data.name, value: data.value })
      );
      addStudentTask({ name: data.name, hash: data.hash });
    }
    if (
      pathname[pathname.length - 1] !== "cards" &&
      pathname[pathname.length - 1] !== "test" &&
      pathname[pathname.length - 1] !== "learning"
    ) {
      navigate("cards");
    }
  }, [taskQueryResult.currentData]);

  if (
    taskQueryResult.isSuccess &&
    taskQueryResult.currentData &&
    studentTaskResponse.status === "fulfilled"
  ) {
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
