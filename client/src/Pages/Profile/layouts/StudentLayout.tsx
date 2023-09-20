import React, { useEffect, useState } from "react";
import { CommonButton } from "../../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { ProfileTaskList } from "../../../components/ProfileTaskList";
import { userApiSlice } from "../../../services/trEnglishApi/userApiSlice";
import { triggerWarningNotification } from "../../../utils/notificationUtilities";

export const StudentLayout: React.FC = () => {
  const [codeValue, setCodeValue] = useState<string>("");
  const navigate = useNavigate();
  const [addTask, addTaskResponse] = userApiSlice.useAddStudentTaskMutation();

  const addTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask({ hash: codeValue });
  };

  useEffect(() => {
    if (addTaskResponse.isError) {
      triggerWarningNotification("Задание не найдено");
      return;
    }
    if (addTaskResponse.isSuccess) {
      console.log(addTaskResponse.data);
      navigate(`../task/${codeValue}`);
    }
  }, [addTaskResponse]);

  return (
    <div className="mt-2">
      <p>
        Вы можете найти задание по коду, который вам должен прислать учитель.
      </p>
      <form onSubmit={addTaskHandler}>
        <input
          value={codeValue}
          className="w-52 h-7 rounded bg-bg-input p-2 mr-2 outline-none focus:outline-main-purple"
          placeholder="Введите код"
          type="text"
          onChange={(e) => setCodeValue(e.target.value)}
        />
        <CommonButton type={"submit"}>Найти задание</CommonButton>
      </form>
      <ProfileTaskList></ProfileTaskList>
    </div>
  );
};
