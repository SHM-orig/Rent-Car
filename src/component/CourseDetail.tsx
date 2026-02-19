import React from "react";

interface Video {
  name: string;
  videoUrl: string;
  imgUrl: string;
  description?: string;
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

type Props = {
  course: Course | null;
};

const CourseDetail: React.FC<Props> = ({ course }) => {
  if (!course) return null;

  const allVideos = course.modules.flatMap((mod) => mod.videos);

  return (
    <div className="text-light">
      <div className="d-flex gap-4 align-items-start mb-4">
        <img
          src={course.imgUrl}
          alt={course.name}
          className="rounded-4"
          style={{ width: 220, objectFit: "cover" }}
        />

        <div>
          <h2 className="mb-2">{course.name}</h2>
          <p className="text-secondary">{course.description}</p>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-4">
        {allVideos.map((vid, index) => (
          <div
            key={index}
            className="card bg-black border-0 p-2"
            style={{ width: 220 }}
          >
            <img
              src={vid.imgUrl}
              alt={vid.name}
              style={{ height: 120, objectFit: "cover" }}
              className="rounded-3"
            />

            <div className="mt-2 text-light">
              <h6 className="fw-bold">{vid.name}</h6>

              {vid.description && <p className="small">{vid.description}</p>}

              <a
                href={vid.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm w-100 mt-2"
              >
                Watch
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
