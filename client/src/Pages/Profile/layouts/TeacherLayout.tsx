import React from "react";
import { CommonButton } from "../../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { ProfileTaskList } from "../../../components/ProfileTaskList";

export const TeacherLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-3">
      <CommonButton
        onClick={() => {
          navigate("create-task");
        }}
        type="button"
      >
        Создать задание
      </CommonButton>
      <ProfileTaskList></ProfileTaskList>
    </div>
  );
};
