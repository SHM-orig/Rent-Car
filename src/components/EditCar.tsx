import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      const snap = await getDoc(doc(db, "cars", id));
      if (snap.exists()) {
        setForm(snap.data());
      }
    };
    fetchCar();
  }, [id]);

  if (!form) return <h2>Loading...</h2>;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!id) return;

    try {
      await updateDoc(doc(db, "cars", id), form);
      alert("Yangilandi ✅");
      navigate("/home"); // 🔥 MUHIM
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="container py-5 text-white">
      <div className="card p-4 bg-dark shadow-lg">
        <h3 className="mb-4">Edit Car</h3>

        <div className="row g-3">
          {Object.keys(form).map((key) =>
            key !== "createdAt" ? (
              <div className="col-md-6" key={key}>
                <input
                  type="text"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            ) : null
          )}
        </div>

        <button className="btn btn-success mt-4 w-100" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCar;
