import React, { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

interface Video {
  name: string;
  videoUrl: string;
  imgUrl: string;
}

interface Module {
  id: number;
  title: string;
  videos: Video[];
}

interface Course {
  name: string;
  description: string;
  imgUrl: string;
  modules: Module[];
}

interface AddCourseProps {
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const AddCourse: React.FC<AddCourseProps> = ({ setCourses, setActive }) => {
  const [course, setCourse] = useState<Course>({
    name: "",
    description: "",
    imgUrl: "",
    modules: [],
  });

  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [video, setVideo] = useState<Video>({
    name: "",
    videoUrl: "",
    imgUrl: "",
  });
  const [showModal, setShowModal] = useState(false);

  const addModule = () => {
    const newModule: Module = {
      id: course.modules.length,
      title: `Module ${course.modules.length + 1}`,
      videos: [],
    };
    setCourse((prev) => ({ ...prev, modules: [...prev.modules, newModule] }));
    setActiveModule(newModule.id);
  };

  const addVideo = () => {
    if (!video.name || !video.videoUrl || !video.imgUrl) {
      alert("Hamma maydonlarni to‘ldiring");
      return;
    }

    if (activeModule === null) return;

    setCourse((prev) => {
      const modules = [...prev.modules];
      modules[activeModule].videos.push({ ...video });
      return { ...prev, modules };
    });

    setVideo({ name: "", videoUrl: "", imgUrl: "" });
    setShowModal(false);
  };

  const confirmCourse = () => {
    if (!course.name || !course.imgUrl || course.modules.length === 0) {
      alert("Course nomi, rasm va kamida 1 modul bo‘lishi kerak");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const newCourse = {
      ...course,
      ownerEmail: currentUser.email,
    };

    setCourses((prev) => [...prev, newCourse]);
    setActive("courses");
    setCourse({ name: "", description: "", imgUrl: "", modules: [] });
    setActiveModule(null);
  };

  return (
    <div className="card bg-black text-light p-4" style={{ maxWidth: 600 }}>
      <h4 className="mb-3">Add Course</h4>

      <input
        className="form-control input-modern mb-2"
        placeholder="Course name"
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />

      <textarea
        className="form-control input-modern mb-2"
        placeholder="Description"
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />

      <input
        className="form-control input-modern mb-2"
        placeholder="Image URL"
        value={course.imgUrl}
        onChange={(e) => setCourse({ ...course, imgUrl: e.target.value })}
      />

      <button className="btn btn-add-module mb-3" onClick={addModule}>
        Add Module +
      </button>

      {course.modules.length > 0 && (
        <div className="d-flex gap-2 mb-3 flex-wrap">
          {course.modules.map((mod, index) => (
            <button
              key={mod.id}
              className={`btn ${
                activeModule === index ? "btn-primary" : "btn-outline-light"
              }`}
              onClick={() => setActiveModule(index)}
            >
              {mod.title}
            </button>
          ))}
        </div>
      )}

      {activeModule !== null && (
        <button
          className="btn btn-add-video mb-3"
          onClick={() => setShowModal(true)}
        >
          Add Video to {course.modules[activeModule].title}
        </button>
      )}

      <Rodal
        visible={showModal}
        onClose={() => setShowModal(false)}
        height={300}
      >
        <div className="p-3">
          <h6>Add Video</h6>
          <input
            className="form-control input-modern mb-2"
            placeholder="Video Name"
            value={video.name}
            onChange={(e) =>
              setVideo((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <input
            className="form-control input-modern mb-2"
            placeholder="Video URL"
            value={video.videoUrl}
            onChange={(e) =>
              setVideo((prev) => ({ ...prev, videoUrl: e.target.value }))
            }
          />

          <input
            className="form-control input-modern mb-2"
            placeholder="Video Image URL"
            value={video.imgUrl}
            onChange={(e) =>
              setVideo((prev) => ({ ...prev, imgUrl: e.target.value }))
            }
          />

          <button className="btn btn-add-module w-100" onClick={addVideo}>
            Add Video
          </button>
        </div>
      </Rodal>

      <button className="btn btn-add-module" onClick={confirmCourse}>
        Confirm Course
      </button>
    </div>
  );
};

export default AddCourse;
