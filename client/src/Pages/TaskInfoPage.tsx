import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { userApiSlice } from "../services/userApiSlice";
import { Roller } from "react-spinners-css";
import { triggerSuccessNotification } from "../utils/notificationUtilities";
import copyIcon from "../assets/copy-svgrepo-com.svg";

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
          triggerSuccessNotification(onCopyMessage);
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
      <div className="text-sm sm:text-lg mt-3">
        <h2 className="text-xl sm:text-2xl mb-1">
          Название задания: {taskQueryResult.currentData.name}
        </h2>
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
        <p className="mt-1 bg-cart-bg-dark inline-block p-2 rounded">
          Код задания:{" "}
          <span
            className="text-main-purple cursor-pointer"
            onClick={(e) => copyClickHandler(e, "Код скопирован")}
          >
            {hashUrl}
          </span>
          <img
            className="w-4 h-4 mb-1 inline-block ml-1 white-img"
            src={copyIcon}
            alt="copyIcon"
          />
          . <br /> По этому коду ученики смогут найти ваше задание и начать его
          выполнять
        </p>
        <p className="mt-2 sm:px-2 bg-cart-bg-dark inline-block py-2 rounded">
          Ссылка на задание:{" "}
          <span
            className="text-main-purple cursor-pointer"
            onClick={(e) => copyClickHandler(e, "Ссылка скопирована")}
          >
            {`${hostName}/task/${hashUrl}`}
          </span>
          <img
            className="w-4 mb-1 h-4 inline-block ml-1 white-img"
            src={copyIcon}
            alt="copyIcon"
          />
          . <br /> По этой ссылке ученики тоже смогут получить задание и начать
          его выполнять.
        </p>
      </div>
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
