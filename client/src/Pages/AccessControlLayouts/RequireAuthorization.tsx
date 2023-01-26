import React, { useEffect } from "react";
import { useAppSelector } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { userApiSlice } from "../../services/trEnglishApi/userApiSlice";

const RequireAuthorization: React.FC = () => {
  const token = useAppSelector((state) => state.authReducer.accessToken);
  const [getUserInfoQuery, userResponse] =
    userApiSlice.useLazyGetUserInfoQuery();

  useEffect(() => {
    getUserInfoQuery("");
  }, []);

  if (userResponse.isSuccess && token) {
    console.log("access");
    return (
      <>
        <div className="container mx-auto ">
          <Header></Header>
          <Outlet></Outlet>
        </div>
      </>
    );
  } else if (userResponse.isError || !token) {
    console.log("leave");
    return <Navigate to="/auth/login"></Navigate>;
  } else {
    console.log("stay");
    return <></>;
  }
};

export default RequireAuthorization;
