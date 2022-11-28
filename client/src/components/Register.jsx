import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { config } from "../config";

export const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
    try {
      const url = `${config.url}/auth/registration`;
     await axios.post(url, {
        username: username,
        password: password,
      });
      navigate("/login");
    } catch (e) {
        throw new Error("Register failed", { cause: e });
    }
    }

    return (
        <div className="auth-form-container">
            <h2>Зарегистрироваться</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Имя пользователя</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="text" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Пароль</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" className="auth-btn">Зарегистрироваться</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Уже есть аккаунт? Войти.</button>
    </div>
    )
}