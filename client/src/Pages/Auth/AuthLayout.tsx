import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/auth" ||
      window.location.pathname === "/auth/"
    ) {
      navigate("login");
    }
  }, []);

  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};

export default AuthLayout;
