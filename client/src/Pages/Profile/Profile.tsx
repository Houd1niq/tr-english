import React, { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TeacherLayout } from "./layouts/TeacherLayout";
import { Roller } from "react-spinners-css";
import { StudentLayout } from "./layouts/StudentLayout";
import { userApiSlice } from "../../services/trEnglishApi/userApiSlice";
import { setUserInfo } from "../../store/slices/authSlice";

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const [getUserInfoQuery, userResponse] =
    userApiSlice.useLazyGetUserInfoQuery();
  useLayoutEffect(() => {
    if (!userResponse.isSuccess) {
      getUserInfoQuery("");
    }
    if (userResponse.isSuccess && userResponse.currentData) {
      dispatch(setUserInfo(userResponse.currentData));
    }
  }, [userResponse]);

  let greeting: string = setGreeting(new Date().getHours());

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
    <div className="flex justify-center items-center h-[80vh]">
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
