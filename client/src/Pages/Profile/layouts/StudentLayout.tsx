import React, { useState } from "react";
import { TUser } from "../../../store/slices/authSlice";
import { CommonButton } from "../../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import { ProfileTaskList } from "../../../components/ProfileTaskList";
import { userApiSlice } from "../../../services/trEnglishApi/userApiSlice";
import { triggerWarningNotification } from "../../../utils/notificationUtilities";

export const StudentLayout: React.FC<{ user: TUser }> = ({ user }) => {
  const [codeValue, setCodeValue] = useState<string>("");
  const navigate = useNavigate();
  const [getOneTaskQuery] = userApiSlice.useLazyGetOneTaskQuery();
  return (
    <div className="mt-2">
      <p>
        Вы можете найти задание по коду, который вам должен прислать учитель.
      </p>
      <input
        value={codeValue}
        className="w-52 h-7 rounded bg-bg-input p-2 mr-2 outline-none focus:outline-main-purple"
        placeholder="Введите код"
        type="text"
        onChange={(e) => setCodeValue(e.target.value)}
      />
      <CommonButton
        onClick={async () => {
          const taskQueryResult = await getOneTaskQuery(codeValue);
          if (taskQueryResult.isError) {
            triggerWarningNotification("Задание не найдено");
            return;
          }
          navigate(`../task/${codeValue}`);
        }}
        value="Найти задание"
      ></CommonButton>
      <ProfileTaskList
        user={user}
        typeOfTaskList="studentTaskList"
      ></ProfileTaskList>
    </div>
  );
};
