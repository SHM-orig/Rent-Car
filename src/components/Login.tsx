import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error: any) {
      alert("Неверный email или пароль");
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4">
        <h3>Admin Login</h3>

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-dark w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="m-auto text-center" >
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
