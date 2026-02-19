import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [passwordAlert, setPasswordAlert] = useState(false);

  const checkUser = () => {
    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }

    const found = users.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (!found) {
      alert("Email yoki password xato");
      return;
    }

    if (user.password.length < 8) {
      alert("Password kamida 8 ta belgidan iborat bo‘lishi kerak");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(found));
    localStorage.setItem("role", found.role);

    navigate(found.role === "teacher" ? "/teacher" : "/user");
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-dark p-5">
      <div className="card bg-black p-4 rounded-4" style={{ width: 380 }}>
        <h3 className="fw-bold text-center mb-4 text-light">Welcome Back 👋</h3>

        <input
          type="email"
          className="form-control input-modern mb-2"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control input-modern mb-2"
          placeholder="Password"
          onChange={(e) => {
            const value = e.target.value;
            setUser({ ...user, password: value });
            setPasswordAlert(value.length > 0 && value.length < 8);
          }}
        />
        {passwordAlert && (
          <p className="text-danger small">
            Password must be at least 8 characters
          </p>
        )}

        <button className="btn btn-glass" onClick={checkUser}>
          Sign In
        </button>

        <p className="text-center mt-3 text-secondary">
          Don’t have account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
