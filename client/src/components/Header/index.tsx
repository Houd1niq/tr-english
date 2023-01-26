import React from "react";
import { HeaderItem } from "./HeaderItem";
import { useNavigate } from "react-router-dom";
import { authApiSlice } from "../../services/trEnglishApi/authApiSlice";
import { useAppDispatch } from "../../store/store";
import { logOut } from "../../store/slices/authSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [logout] = authApiSlice.useLogoutMutation();
  const dispatch = useAppDispatch();
  return (
    <div className="header mt-3  ">
      <ul className="flex justify-end gap-4">
        <HeaderItem
          value="Профиль"
          onClick={() => {
            navigate("/profile", { replace: true });
          }}
        ></HeaderItem>
        <HeaderItem
          value="Выйти"
          onClick={() => {
            logout("");
            dispatch(logOut());
          }}
        ></HeaderItem>
      </ul>
    </div>
  );
};

export default Header;
