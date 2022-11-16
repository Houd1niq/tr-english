import React from "react";
import { CommonButton } from "../../components/CommonButton";
import { TaskItem } from "../../components/TaskItem";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../store/slices/authSlice";

export const TeacherLayout: React.FC<{ user: TUser }> = ({ user }) => {
  const navigate = useNavigate();

  function onClickTaskHandler(hash: string) {
    navigate(`task-info/${hash}`, { replace: true });
  }

  return (
    <div className="mt-3">
      {/*<h3 className="text-2xl text-main-white">Вы можете: </h3>*/}
      <CommonButton
        onClick={() => {
          navigate("create-task");
        }}
        value="Создать задание"
        type="button"
      ></CommonButton>
      <h2 className="text-2xl mt-2 text-main-white">Ваши задания:</h2>
      <ul className="mt-3">
        {user.tasks && user.tasks.length > 0 ? (
          user.tasks.map((item, idx) => {
            const date: Date = new Date(item.createdAt);
            const dateString: string = date.toLocaleDateString("ru-RU", {
              month: "long",
              day: "numeric",
            });
            return (
              <TaskItem
                onClick={() => {
                  navigate(`../task-info/${item.hash}`, { replace: false });
                }}
                key={`${item.name}-${item.createdAt}`}
                name={item.name}
                date={dateString}
              ></TaskItem>
            );
          })
        ) : (
          <div>Вы пока не создали ни одного задания</div>
        )}
      </ul>
    </div>
  );
};
