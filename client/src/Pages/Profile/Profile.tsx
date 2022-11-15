import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logOut, setUserInfo } from "../../store/slices/authSlice";
import { authApiSlice } from "../../services/authApiSlice";
import { userApiSlice } from "../../services/userApiSlice";
import { CommonButton } from "../../components/CommonButton";
import { TeacherLayout } from "./TeacherLayout";
import { Roller } from "react-spinners-css";
import { useWhyDidYouUpdate } from "ahooks";

export const Profile: React.FC = () => {
  const [getInfo] = userApiSlice.useLazyGetUserInfoQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const res = getInfo("");
    res.then((res) => {
      if (res.data) dispatch(setUserInfo(res.data));
    });
  }, []);

  const user = useAppSelector((state) => state.authReducer.user);
  if (user) {
    let roleContent: JSX.Element = <></>;
    return (
      <div>
        <div className="">
          <div className="">
            <h1 className="text-4xl text-center text-main-purple mt-5">
              Профиль
            </h1>
            <h2 className="text-2xl text-center text-main-white mt-5">
              Добрый день, {user.name}
            </h2>
          </div>
        </div>
        {user.role === "teacher" ? (
          <TeacherLayout user={user}></TeacherLayout>
        ) : (
          <div>Профиль ученика</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Roller></Roller>
    </div>
  );
};
