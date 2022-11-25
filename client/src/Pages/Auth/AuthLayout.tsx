import React, { useEffect } from "react";
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
      <header className="h-12 mb-3">
        <div className="hidden sm:flex text-[20px] text-main-white h-12 animate-loginLoad font-bold justify-center fixed bg-cart-bg-dark w-full inline-flex items-center">
          TR-English
        </div>
        <div className="sm:hidden text-[20px] text-main-white h-12 animate-loginLoad font-bold justify-center fixed bg-cart-bg-dark w-full inline-flex items-center">
          TR-Eng
        </div>
      </header>
      <div className="container mx-auto flex justify-center items-center flex-grow">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default AuthLayout;
