import React, { useEffect, useState } from "react";
import CourseList from "../component/CourseList";
import CourseDetail from "../component/CourseDetail";
import Profile from "./Profile";

const User = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [active, setActive] = useState("courses");

  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) setCourses(JSON.parse(saved));
  }, []);

  return (
    <div className="d-flex">
      <div className="p-3 bg-black vh-100" style={{ width: 240 }}>
        <h5 className="text-light mb-4">User Panel</h5>

        {["courses", "profile"].map((item) => (
          <button
            key={item}
            className={`btn w-100 mb-2 text-start ${
              active === item ? "btn-primary" : "btn-outline-light"
            }`}
            onClick={() => setActive(item)}
          >
            {item === "courses" && "📚 Courses"}
            {item === "profile" && "👤 Profile"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-4 bg-dark">
        {active === "courses" && (
          <CourseList
            courses={courses}
            onSelect={setSelectedCourse}
            setActive={setActive}
          />
        )}

        {active === "detail" && (
          <CourseDetail course={selectedCourse} />
        )}

        {active === "profile" && <Profile />}
      </div>
    </div>
  );
};

export default User;
