import React from "react";
import { TaskItemInProfile } from "./TaskItemInProfile";
import { TUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const ProfileTaskList: React.FC<{
  user: TUser;
  typeOfTaskList: "teacherTaskList" | "studentTaskList";
}> = ({ user, typeOfTaskList }) => {
  const navigate = useNavigate();
  const link: string =
    typeOfTaskList === "studentTaskList" ? "../task/" : "../task-info/";
  return (
    <div className="mt-3">
      <h2 className="text-2xl">Ваши задания:</h2>
      <ul className="mt-1">
        {user.tasks && user.tasks.length > 0 ? (
          user.tasks.map((item) => {
            const date: Date = new Date(item.createdAt);
            const dateString: string = date.toLocaleDateString("ru-RU", {
              month: "long",
              day: "numeric",
            });
            return (
              <TaskItemInProfile
                onClick={() => {
                  navigate(`${link}${item.hash}`, { replace: false });
                }}
                key={`${item.name}-${item.createdAt}`}
                name={item.name}
                date={dateString}
              ></TaskItemInProfile>
            );
          })
        ) : (
          <div>Здесь пока нет ни одного задания</div>
        )}
      </ul>
    </div>
  );
};
