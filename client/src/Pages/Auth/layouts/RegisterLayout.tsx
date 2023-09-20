import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import LoginRoleSelector from "../../../components/LoginRoleSelector";
import { ErrorType } from "../../../types";
import { useAppDispatch } from "../../../store/store";
import { setAccessToken } from "../../../store/slices/authSlice";
import { authApiSlice } from "../../../services/trEnglishApi/authApiSlice";
import { CommonButton } from "../../../components/CommonButton";
import { triggerWarningNotification } from "../../../utils/notificationUtilities";

const RegisterLayout: React.FC = () => {
  const [register, registerResponse] = authApiSlice.useRegisterMutation();
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (registerResponse.status === "fulfilled" && registerResponse.isSuccess) {
      dispatch(setAccessToken(registerResponse.data.accessToken));
      navigate("/profile", { replace: true });
    }
    if (registerResponse.status === "rejected") {
      const error = registerResponse.error as ErrorType;
      if (typeof error.data.message === "object") {
        error.data.message.forEach((message) => {
          triggerWarningNotification(message);
        });
      } else {
        triggerWarningNotification(error.data.message);
      }
    }
  }, [registerResponse.status]);

  async function singUp(
    login: string,
    password: string,
    name: string,
    role: string
  ) {
    if (name.length < 4) {
      triggerWarningNotification("Имя должно содержать минимум 4 символа");
      return;
    }
    if (login.length < 4) {
      triggerWarningNotification("Логин должен содержать минимум 4 символа");
      return;
    }
    if (password.length < 4) {
      triggerWarningNotification("Пароль должен содержать минимум 4 символа");
      return;
    }
    await register({ login, role, password, name });
  }

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        singUp(login, password, name, role);
      }}
      className="w-[360px] py-8 bg-cart-bg-dark rounded-3xl items-center flex flex-col "
    >
      <h2 className="text-main-white text-2xl mt-2 ">Зарегистрироваться</h2>
      <FormInput
        value={name}
        getValue={setName}
        label="Имя"
        type="text"
        placeholder="Введите имя пользователя"
      ></FormInput>
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
      <LoginRoleSelector getSelectedRole={setRole}></LoginRoleSelector>

      <CommonButton type="submit">Зарегистрироваться</CommonButton>
      <Link to="../login" className="text-main-purple text-[12px] mt-2">
        Уже зарегистрированны? <br /> Войти
      </Link>
    </form>
  );
};

export default RegisterLayout;
