import React from "react";
import { useAppSelector } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { userApiSlice } from "../../services/trEnglishApi/userApiSlice";

const RequireAuthorization: React.FC = () => {
  const token = useAppSelector((state) => state.authReducer.accessToken);
  const userResponse = userApiSlice.useGetUserInfoQuery("");

  if (userResponse.isSuccess && token) {
    return (
      <>
        <div className="container mx-auto ">
          <Header></Header>
          <Outlet></Outlet>
        </div>
      </>
    );
  } else if (!token) {
    return <Navigate to="/auth/login"></Navigate>;
  } else {
    return <></>;
  }
};

export default RequireAuthorization;
