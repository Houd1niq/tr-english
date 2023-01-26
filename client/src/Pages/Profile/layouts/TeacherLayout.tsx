import React from "react";
import { CommonButton } from "../../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../../store/slices/authSlice";
import { ProfileTaskList } from "../../../components/ProfileTaskList";

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
      <ProfileTaskList
        user={user}
        typeOfTaskList="teacherTaskList"
      ></ProfileTaskList>
    </div>
  );
};
