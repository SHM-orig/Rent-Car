import React, { useEffect, useState } from "react";
import CourseList from "../component/CourseList";
import AddCourse from "../component/AddCourse";
import CourseDetail from "../component/CourseDetail";
import Profile from "../pages/Profile";

const Teacher = () => {
  const [active, setActive] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("courses") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const myCourses = saved.filter(
      (course: { ownerEmail: any; }) => course.ownerEmail === currentUser.email
    );

    setCourses(myCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  return (
    <div className="d-flex">
      <div className="p-3 bg-black vh-100" style={{ width: 240 }}>
        <h5 className="text-light mb-4">Teacher Panel</h5>

        {["profile", "add", "courses"].map((item) => (
          <button
            key={item}
            className={`btn w-100 mb-2 text-start ${
              active === item ? "btn-primary" : "btn-outline-light"
            }`}
            onClick={() => setActive(item)}
          >
            {item === "profile" && "👤 Profile"}
            {item === "add" && "➕ Add Course"}
            {item === "courses" && "📚 Courses"}
          </button>
        ))}
      </div>

      <div className="flex-grow-1 p-4 bg-dark">
        {active === "courses" && (
          <CourseList
            courses={courses}
            onSelect={setSelectedCourse}
            setActive={setActive}
          />
        )}

        {active === "add" && (
          <AddCourse setCourses={setCourses} setActive={setActive} />
        )}

        {active === "detail" && <CourseDetail course={selectedCourse} />}
        {active === "profile" && <Profile />}
      </div>
    </div>
  );
};

export default Teacher;
