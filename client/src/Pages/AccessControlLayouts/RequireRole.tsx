import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonButton } from "../../components/CommonButton";
import { userApiSlice } from "../../services/trEnglishApi/userApiSlice";

export const RequireRole: React.FC<{ role: "teacher" | "student" }> = ({
  role,
}) => {
  const navigate = useNavigate();
  const { data: user } = userApiSlice.useGetUserInfoQuery("");

  if (user && user.role === role) {
    return (
      <div className="container mx-auto w-[1180px]">
        <Outlet></Outlet>
      </div>
    );
  }

  if (user && user.role !== role) {
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
