import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import LoginRoleSelector from "../../components/LoginRoleSelector";
import { ApiSlice } from "../../services/ApiSlice";
import { isAuthSuccess } from "../../types";
import { useAppDispatch } from "../../store/store";
import { setAccessToken } from "../../store/slices/authSlice";
import { authApiSlice } from "../../services/authApiSlice";
import { CommonButton } from "../../components/CommonButton";

const RegisterPage: React.FC = () => {
  const [register, {}] = authApiSlice.useRegisterMutation();
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function cleanInputs(): void {
    setLogin("");
    setName("");
    setPassword("");
  }

  async function singUp(
    login: string,
    password: string,
    name: string,
    role: string
  ) {
    const response = await register({ login, role, password, name });
    if (isAuthSuccess(response)) {
      cleanInputs();
      dispatch(setAccessToken(response.data.accessToken));
      navigate("/profile", { replace: true });
    }
  }

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        singUp(login, password, name, role);
      }}
      className="w-[360px] py-8 bg-cart-bg-dark rounded-3xl items-center flex flex-col "
    >
      <h2 className="text-main-white text-2xl mt-2 ">Зарегестрироваться</h2>
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

      <CommonButton value="Зарегестрироваться" type="submit"></CommonButton>
      <Link to="../login" className="text-main-purple text-[12px] mt-2">
        Уже зарегестрированны? <br /> Войти
      </Link>
    </form>
  );
};

export default RegisterPage;
