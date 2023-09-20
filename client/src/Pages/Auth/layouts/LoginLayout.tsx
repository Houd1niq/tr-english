import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import { useAppDispatch } from "../../../store/store";
import { setAccessToken } from "../../../store/slices/authSlice";
import { authApiSlice } from "../../../services/trEnglishApi/authApiSlice";
import { CommonButton } from "../../../components/CommonButton";
import { ErrorType } from "../../../types";
import { triggerWarningNotification } from "../../../utils/notificationUtilities";

const LoginLayout: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authorize, authResponse] = authApiSlice.useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authResponse.status === "fulfilled" && authResponse.isSuccess) {
      dispatch(setAccessToken(authResponse.data.accessToken));
      navigate("/profile", { replace: true });
    }

    if (
      authResponse.status === "rejected" &&
      authResponse.isError &&
      authResponse.error
    ) {
      const error = authResponse.error as ErrorType;
      if (typeof error.data.message === "object") {
        error.data.message.forEach((message) => {
          triggerWarningNotification(message);
        });
      } else {
        triggerWarningNotification(error.data.message);
      }
    }
  }, [authResponse.status]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const loginTrimed: string = login.trim();
          const passwordTrimed: string = password.trim();
          if (loginTrimed.length === 0) {
            triggerWarningNotification("Введите логин");
            return;
          }
          if (passwordTrimed.length === 0) {
            triggerWarningNotification("Введите пароль");
            return;
          }
          authorize({ login: loginTrimed, password: passwordTrimed });
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
        <CommonButton className="min-w-[30%] mt-2" type="submit">
          Войти
        </CommonButton>
        <Link to="../register" className="text-main-purple text-[12px] mt-2">
          Ещё не зарегистрированы? <br /> Зарегистрироваться
        </Link>
      </form>
    </>
  );
};

export default LoginLayout;
