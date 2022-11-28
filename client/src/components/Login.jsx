import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { config } from "../config";


export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${config.url}/auth/login`;
      let response = await axios.post(url, {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/admin");
    } catch (e) {
      throw new Error("Login failed", { cause: e });
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Войти</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Имя пользователя</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Пароль</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="auth-btn" type="submit">Войти</button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Нет аккаунта? Зарегистрироваться.
      </button>
    </div>
  );
};
