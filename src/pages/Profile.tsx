import React, { useEffect, useState } from "react";

interface UserData {
  name: string;
  surname: string;
  email: string;
  role: string;
  password: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserData>({
    name: "",
    surname: "",
    email: "",
    role: "",
    password: "",
  });

  const [passwordAlert, setPasswordAlert] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ ...parsed, password: "" });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordAlert(value.length > 0 && value.length < 8);
    }
  };

  const handleSave = () => {
    if (passwordAlert) return;

    let users: UserData[] = [];

    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }

    const updatedUser: UserData = {
      ...user,
      password:
        user.password.length >= 8
          ? user.password
          : users.find((u) => u.email === user.email)?.password || "",
    };

    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser({ ...updatedUser, password: "" });
    alert("Profile updated!");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card bg-black p-4 shadow-lg rounded-4"
        style={{ width: 480 }}
      >
        <h3 className="mb-3 text-light">Your Profile</h3>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control input-modern"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <label>Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control input-modern"
            name="surname"
            value={user.surname}
            onChange={handleChange}
          />
          <label>Surname</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control input-modern"
            name="email"
            value={user.email}
            disabled
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <select
            className="form-select input-modern"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="teacher">Teacher</option>
            <option value="user">User</option>
          </select>
          <label>Role</label>
        </div>

        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control input-modern"
            name="password"
            placeholder="New Password"
            value={user.password}
            onChange={handleChange}
          />
          <label>New Password</label>
        </div>

        {passwordAlert && (
          <p className="text-danger small">
            Password must be at least 8 characters
          </p>
        )}

        <button className="btn btn-add-module w-100" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
