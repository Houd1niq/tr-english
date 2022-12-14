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
import { firstLetterToUppercase } from "../../utils/utilsFunction";

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
      const value = data.value.map((card) => {
        return {
          id: card.id,
          rus: firstLetterToUppercase(card.rus),
          eng: firstLetterToUppercase(card.eng),
        };
      });
      dispatch(setCurrentTask({ hash: data.hash, name: data.name, value }));
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
            <TaskSelectorItem value="????????????????" link="cards"></TaskSelectorItem>
            <TaskSelectorItem
              value="????????????????????"
              link="learning"
            ></TaskSelectorItem>
            <TaskSelectorItem value="????????" link="test"></TaskSelectorItem>
          </ul>
        </nav>
        <Outlet></Outlet>
      </>
    );
  }
  return <Roller></Roller>;
};
