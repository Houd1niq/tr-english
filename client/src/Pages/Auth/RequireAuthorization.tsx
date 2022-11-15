import React from "react";
import { useAppSelector } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header/";

const RequireAuthorization: React.FC = () => {
  const token = useAppSelector((state) => state.authReducer.accessToken);
  if (token) {
    return (
      <>
        <div className="container mx-auto w-[1180px]">
          <Header></Header>
          <Outlet></Outlet>
        </div>
      </>
    );
  } else {
    return <Navigate to="/auth" replace={true}></Navigate>;
  }
};

export default RequireAuthorization;
