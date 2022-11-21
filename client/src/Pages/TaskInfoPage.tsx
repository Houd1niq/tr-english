import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { userApiSlice } from "../services/userApiSlice";
import { Roller } from "react-spinners-css";

export const TaskInfoPage: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const hashUrl = pathname[pathname.length - 1];
  const hostName = window.location.host;

  function copyClickHandler(
    event: React.MouseEvent<HTMLSpanElement>,
    onCopyMessage: string
  ): void {
    if (event.currentTarget.textContent) {
      navigator.clipboard
        .writeText(event.currentTarget.textContent)
        .then(() => {
          alert(onCopyMessage);
        });
    }
  }

  const [getOneTaskQuery, taskQueryResult] =
    userApiSlice.useLazyGetOneTaskQuery();
  useEffect(() => {
    getOneTaskQuery(hashUrl);
  }, []);

  if (taskQueryResult.isSuccess && taskQueryResult.currentData) {
    return (
      <>
        <h2>Название задания: {taskQueryResult.currentData.name}</h2>
        <p>
          Вермя создания задания:{" "}
          {new Date(taskQueryResult.data.createdAt).toLocaleDateString(
            "ru-RU",
            {
              day: "numeric",
              year: "numeric",
              month: "long",
            }
          )}
        </p>
        <p className="mt-1">
          Код задания:{" "}
          <span
            className="text-main-purple cursor-pointer"
            onClick={(e) => copyClickHandler(e, "Код скопирован")}
          >
            {hashUrl}
          </span>
          . <br /> По этому коду ученики смогут найти ваше задание и начать его
          выполнять
        </p>
        <p className="mt-1">
          Ссылка на задание:{" "}
          <span
            className="text-main-purple cursor-pointer"
            onClick={(e) => copyClickHandler(e, "Ссылка скопирована")}
          >
            {`${hostName}/task/${hashUrl}`}
          </span>
          . <br /> По этой ссылке ученики тоже смогут получить задание и начать
          его выполнять.
        </p>
      </>
    );
  }
  if (taskQueryResult.isError) {
    return (
      <>
        <h2>Error</h2>
      </>
    );
  }
  // if (taskQueryResult.isFetching) {
  return <Roller></Roller>;
  // }
  // return <></>;
};
