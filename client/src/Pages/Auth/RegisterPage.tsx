import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import LoginRoleSelector from "../../components/LoginRoleSelector";
import { ApiSlice } from "../../services/AuthService";
import { isRegisterSuccess } from "../../types";
import { useAppDispatch } from "../../store/store";
import { setAccessToken } from "../../store/slices/authSlice";

const RegisterPage: React.FC = () => {
  const [register, {}] = ApiSlice.useRegisterMutation();
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    if (isRegisterSuccess(response)) {
      cleanInputs();
      dispatch(setAccessToken(response.data.accessToken));
    }
  }

  return (
    <div className="container flex justify-center items-center flex-grow">
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

        <button
          type="submit"
          className="text-main-white bg-main-purple w-auto px-3 h-10 rounded-xl mt-2"
        >
          Зарегестрироваться
        </button>
        <Link to="../login" className="text-main-purple text-[12px] mt-2">
          Уже зарегестрированны? <br /> Войти
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
