import React, { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header/";
import { userApiSlice } from "../../services/userApiSlice";
import { setUserInfo } from "../../store/slices/authSlice";

const RequireAuthorization: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReducer.accessToken);
  const [getUserInfoQuery, userResponse] =
    userApiSlice.useLazyGetUserInfoQuery();
  useLayoutEffect(() => {
    if (!userResponse.isSuccess && token) {
      getUserInfoQuery("");
    }
    if (userResponse.isSuccess && userResponse.currentData) {
      dispatch(setUserInfo(userResponse.currentData));
    }
  }, [userResponse]);

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
