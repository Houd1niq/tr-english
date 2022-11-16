import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logOut, setUserInfo } from "../../store/slices/authSlice";
import { authApiSlice } from "../../services/authApiSlice";
import { userApiSlice } from "../../services/userApiSlice";
import { CommonButton } from "../../components/CommonButton";
import { TeacherLayout } from "./TeacherLayout";
import { Roller } from "react-spinners-css";
import { useWhyDidYouUpdate } from "ahooks";
import { StudentLayout } from "./StudentLayout";

export const Profile: React.FC = () => {
  const [getInfo] = userApiSlice.useLazyGetUserInfoQuery();
  const dispatch = useAppDispatch();
  let greeting: string = setGreeting(new Date().getHours());

  useEffect(() => {
    const res = getInfo("");
    res.then((res) => {
      if (res.data) dispatch(setUserInfo(res.data));
    });
  }, []);

  const user = useAppSelector((state) => state.authReducer.user);
  if (user) {
    return (
      <div>
        <div className="">
          <div className="">
            <h1 className="text-4xl text-center text-main-purple mt-2">
              Профиль
            </h1>
            <h2 className="text-2xl text-center text-main-white mt-2">
              {greeting}, {user.name}
            </h2>
          </div>
        </div>
        {user.role === "teacher" ? (
          <TeacherLayout user={user}></TeacherLayout>
        ) : (
          <StudentLayout user={user}></StudentLayout>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Roller></Roller>
    </div>
  );
};

function setGreeting(hours: number): string {
  let greeting = "Добрый день";
  if (hours >= 0 && hours <= 6) greeting = "Доброй ночи";
  else if (hours > 6 && hours <= 12) greeting = "Доброе утро";
  else if (hours > 12 && hours <= 18) greeting = "Добрый день";
  else if (hours > 18 && hours <= 23) greeting = "Добрый вечер";
  return greeting;
}
