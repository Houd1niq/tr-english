import React from "react";
import { TeacherLayout } from "./layouts/TeacherLayout";
import { Roller } from "react-spinners-css";
import { StudentLayout } from "./layouts/StudentLayout";
import { userApiSlice } from "../../services/trEnglishApi/userApiSlice";

export const Profile: React.FC = () => {
  const userResponse = userApiSlice.useGetUserInfoQuery("");
  let greeting: string = setGreeting(new Date().getHours());

  if (userResponse.isSuccess && userResponse.data) {
    const userData = userResponse.data;
    return (
      <div>
        <div className="">
          <div className="">
            <h1 className="text-4xl text-center text-main-purple">Профиль</h1>
            <h2 className="text-2xl text-center text-main-white mt-2">
              {greeting}, {userData.name}
            </h2>
          </div>
        </div>
        {userData.role === "teacher" ? (
          <TeacherLayout></TeacherLayout>
        ) : (
          <StudentLayout></StudentLayout>
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
