import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [passwordAlert, setPasswordAlert] = useState(false);

  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.surname ||
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.role
    ) {
      alert("Hamma maydonlarni to‘ldir");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Password mos emas");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u: any) => u.email === user.email);
    if (exists) {
      alert("Bu email oldin ro‘yxatdan o‘tgan");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("role", user.role);

    if (user.role === "teacher") navigate("/teacher");
    else navigate("/user");

    if (user.password.length < 8) {
      alert("Password kamida 8 ta belgidan iborat bo‘lishi kerak");
      return;
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-dark min-vh-100">
      <div className="card border-0 shadow-lg rounded-4" style={{ width: 380 }}>
        <div className="card-body p-4 bg-black rounded-4">
          <h3 className="text-center text-light fw-bold mb-4">
            Create Account
          </h3>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control input-modern"
              placeholder="Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label className="text-secondary">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control input-modern"
              placeholder="Surname"
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
            />
            <label className="text-secondary">Surname</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control input-modern"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label className="text-secondary">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control input-modern"
              placeholder="Password"
              onChange={(e) => {
                const value = e.target.value;
                setUser({ ...user, password: value });
                setPasswordAlert(value.length > 0 && value.length < 8);
              }}
            />
            <label className="text-secondary">Password</label>
            {passwordAlert && (
              <p className="text-danger small">
                Password must be at least 8 characters
              </p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control input-modern"
              placeholder="Confirm Password"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <label className="text-secondary">Confirm Password</label>
          </div>

          <div className="form-floating mb-4">
            <select
              className="form-select input-modern"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="">Select role</option>
              <option value="teacher">Teacher</option>
              <option value="user">User</option>
            </select>

            <label className="text-secondary">Role</label>
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-glass w-100 py-2 rounded-3"
          >
            Sign Up
          </button>

          <p className="text-center mt-3 text-secondary small">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-primary fw-semibold text-decoration-none"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
