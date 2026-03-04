import "./index.css";
import { Navigate } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
import AddCar from "./components/AddCar";
import Home from "./components/Home";
import CarDetail from "./components/CarDetail";
import EditCar from "./components/EditCar";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import Register from "./components/Register";
import Dostavka from "./components/Dostavka";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);
  return (
    <div className="app">
      <nav className="navbar p-2">
        <div className="nav-left">
          <Link to={"/home"} className="logo-circle">
            <img
              src="https://static.tildacdn.one/tild3062-3963-4362-b764-346531383365/photo_2023-09-28_19-.png"
              alt="logo"
            />
          </Link>

          <div className="brand">
            <Link
              to={"/home"}
              className="fs-6 text-black link-offset-2 link-underline link-underline-opacity-0"
            >
              GONZO MOTORS
            </Link>
            <p>+998 90 081 47 78</p>
          </div>
        </div>

        <div className="nav-center">
          <Link to="/home">
            <button>КАТАЛОГ</button>
          </Link>
          <button>О НАС</button>
          {!user && (
            <>
              <Link to="/login">
                <button>ВОЙТИ</button>
              </Link>

              <Link to="/register">
                <button>РЕГИСТРАЦИЯ</button>
              </Link>
            </>
          )}
          <button>НОВОСТИ</button>
          <button>КОНТАКТЫ</button>
          <Link to={"dostavka"}><button>ДОСТАВКА ТОВАРОВ</button></Link>

          {user && (
            <>
                <Link to="/add-car">
                  <button>ДОБАВИТЬ</button>
                </Link>

              <button onClick={() => signOut(auth)}>ВЫЙТИ</button>
            </>
          )} 
        </div>

        <div className="nav-right">
          <div className="icon-btn">
            <img
              src="https://static.tildacdn.one/tild6230-6563-4264-a137-313663336332/magnifying-glass-sol.svg"
              alt="search"
            />
          </div>

          <div className="icon-btn">
            <img
              src="https://static.tildacdn.one/tild3461-6436-4862-a464-623539356631/Frame.svg"
              alt="menu"
            />
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/edit/:id" element={<EditCar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dostavka" element={<Dostavka />} />

        <Route
          path="/add-car"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditCar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
