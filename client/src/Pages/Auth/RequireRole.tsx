import React from "react";
import { useAppSelector } from "../../store/store";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonButton } from "../../components/CommonButton";

export const RequireRole: React.FC<{ role: "teacher" | "student" }> = ({
  role,
}) => {
  const navigate = useNavigate();
  let user = useAppSelector((state) => state.authReducer.user);

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
