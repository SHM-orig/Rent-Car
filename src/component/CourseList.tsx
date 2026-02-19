const CourseList = ({ courses, onSelect, setActive }) => {
  if (courses.length === 0) {
    return <p className="text-secondary text-light">No courses yet</p>;
  }

  return (
    <div className="d-flex gap-4">
      {courses.map((c, i) => (
        <div
          key={i}
          className="card bg-black text-light shadow-sm border-0 course-card text-light"
          style={{ width: 220 }}
          onClick={() => {
            onSelect(c);
            setActive("detail");
          }}
        >
          <img
            src={c.imgUrl}
            className="card-img-top text-light"
            style={{ height: 130, objectFit: "cover" }}
            alt={c.name}
          />

          <div className="card-body text-center text-light">
            <h6 className="mb-0 text-light">{c.name}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
