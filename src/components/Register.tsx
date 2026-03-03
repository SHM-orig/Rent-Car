import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });

      navigate("/home");
    } catch (error: any) {
      alert(error.code);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3>Регистрация</h3>

        <input
          name="firstName"
          placeholder="Имя"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Фамилия"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
        />

        <button onClick={handleRegister}>
          Зарегистрироваться
        </button>

        <p className="m-auto text-center" >
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Register;