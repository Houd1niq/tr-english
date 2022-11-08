import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRoleSelector from "../../components/LoginRoleSelector";
import FormInput from "../../components/FormInput";

const LoginPage: React.FC = () => {
  const [role, setRole] = useState<"teacher" | "student">("teacher");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="container flex text-2xl justify-center items-center flex-grow">
      <form
        onSubmit={(e) => {
          e.preventDefault();
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

        <LoginRoleSelector getSelectedRole={setRole}></LoginRoleSelector>

        <button
          type="submit"
          className="text-main-white bg-main-purple w-32 h-10 rounded-xl mt-2"
        >
          Войти
        </button>
        <Link to="../register" className="text-main-purple text-[12px] mt-2">
          Ещё не зарегестрированы? <br /> Зарегестрироваться
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
