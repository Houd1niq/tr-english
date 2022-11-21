import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { CommonButton } from "../../components/CommonButton";
import { userApiSlice } from "../../services/userApiSlice";
import { setUserInfo, TUser } from "../../store/slices/authSlice";
import { Roller } from "react-spinners-css";

export const RequireRole: React.FC<{ role: "teacher" | "student" }> = ({
  role,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let user = useAppSelector((state) => state.authReducer.user);
  const [getUserInfoQuery, userResponse] =
    userApiSlice.useLazyGetUserInfoQuery();
  useLayoutEffect(() => {
    if (!user && !userResponse.isSuccess) {
      getUserInfoQuery("");
    }
    if (userResponse.isSuccess && userResponse.currentData && !user) {
      dispatch(setUserInfo(userResponse.currentData));
    }
  }, [user, userResponse]);

  if (user && user.role === role) {
    return (
      <div className="container mx-auto w-[1180px]">
        <Outlet></Outlet>
      </div>
    );
  }
  if (userResponse.isSuccess && user && user.role !== role) {
    return (
      <div className="flex flex-col items-center mt-3">
        <h2 className="text-2xl">Запрещено</h2>
        <CommonButton
          onClick={() => navigate(-1)}
          value="Вернуться назад"
        ></CommonButton>
      </div>
    );
  }
  return <></>;
};
