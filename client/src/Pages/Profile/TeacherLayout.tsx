import React from "react";
import { CommonButton } from "../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../store/slices/authSlice";
import { TaskList } from "./TaskList";

export const TeacherLayout: React.FC<{ user: TUser }> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-3">
      <CommonButton
        onClick={() => {
          navigate("create-task");
        }}
        value="Создать задание"
        type="button"
      ></CommonButton>
      <TaskList user={user} typeOfTaskList="teacherTaskList"></TaskList>
    </div>
  );
};
