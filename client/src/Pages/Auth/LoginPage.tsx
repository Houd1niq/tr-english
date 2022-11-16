import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginRoleSelector from "../../components/LoginRoleSelector";
import FormInput from "../../components/FormInput";
import { ApiSlice } from "../../services/ApiSlice";
import { isAuthSuccess } from "../../types";
import { useAppDispatch } from "../../store/store";
import { setAccessToken } from "../../store/slices/authSlice";
import { authApiSlice } from "../../services/authApiSlice";
import { CommonButton } from "../../components/CommonButton";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authorize, {}] = authApiSlice.useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await authorize({ login, password });
        if (isAuthSuccess(response)) {
          dispatch(setAccessToken(response.data.accessToken));
          navigate("/profile", { replace: true });
        }
      }}
      className="w-[360px] py-8 bg-cart-bg-dark rounded-3xl items-center flex flex-col "
    >
      <h2 className="text-main-white text-2xl mt-2 ">Войти</h2>
      <FormInput
        value={login}
        getValue={setLogin}
        label="Логин"
        type="text"
        placeholder="Введите логин"
      ></FormInput>
      <FormInput
        value={password}
        getValue={setPassword}
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
      ></FormInput>
      <CommonButton value="Войти" type="submit"></CommonButton>
      <Link to="../register" className="text-main-purple text-[12px] mt-2">
        Ещё не зарегестрированы? <br /> Зарегестрироваться
      </Link>
    </form>
  );
};

export default LoginPage;
