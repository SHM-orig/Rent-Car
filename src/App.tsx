import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TeacherRoute from "./component/TeacherRoute";

import Teacher from "./pages/Teacher";
import User from "./pages/User";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => setRole(localStorage.getItem("role")), []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    setRole(null);
  };

  return (
    <div className="min-vh-100 text-light bg-dark">
      <nav className="body d-flex navbar-expand-lg navbar-dark bg-black shadow-sm p-4">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          🎓 EduPlatform
        </Link>

        <div className="ms-auto d-flex gap-2 align-items-center">
          {role === "teacher" && (
            <Link className="btn btn-teacher" to="/teacher">
              Teacher Panel
            </Link>
          )}

          {!role && (
            <Link className="btn btn-modern" to="/sign-in">
              Sign In
            </Link>
          )}

          {role && (
            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route
          path="/teacher"
          element={
            <TeacherRoute>
              <Teacher />
            </TeacherRoute>
          }
        />

        <Route path="/user" element={<User />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
