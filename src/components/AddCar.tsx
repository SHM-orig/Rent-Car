import { useState, type ChangeEvent } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddCar = () => {
  const [images, setImages] = useState<string[]>([""]);

  const [form, setForm] = useState({
    name: "",
    model: "",
    price: "",
    color: "",
    mileage: "",
    engine: "",
    body: "",
    horsepower: "",
    speed: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;

    // Oxirgi input to‘ldirilsa → yangi bo‘sh input chiqadi
    if (index === images.length - 1 && value.trim() !== "") {
      updated.push("");
    }

    setImages(updated);
  };

  const handleAdd = async () => {
    if (!form.name || !form.price) {
      alert("Majburiy maydonlar!");
      return;
    }

    try {
      await addDoc(collection(db, "cars"), {
        ...form,
        images: images.filter((url) => url.trim() !== ""),
        createdAt: Timestamp.now(),
        ownerId: auth.currentUser?.uid,
        ownerEmail: auth.currentUser?.email,
        rented: false,
      });

      alert("Mashina qo‘shildi ✅");

      setForm({
        name: "",
        model: "",
        price: "",
        color: "",
        mileage: "",
        engine: "",
        body: "",
        horsepower: "",
        speed: "",
        phone: "",
      });

      setImages([""]);
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="container py-5 text-white">
      <div className="card p-4 bg-dark shadow-lg">
        <h3 className="mb-4 text-light">🚗 Добавить автомобиль</h3>

        <div className="row g-3">
          {/* Oddiy inputlar */}
          {Object.keys(form).map((key) => (
            <div className="col-md-6" key={key}>
              <input
                type="text"
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                className="form-control"
                placeholder={key}
              />
            </div>
          ))}

          {/* 🔥 Rasm URL lar alohida */}
          <div className="col-12">
            <label className="mb-2">Rasm URL lar</label>

            {images.map((url, index) => (
              <input
                key={index}
                type="text"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="form-control mb-2"
                placeholder={`Rasm link ${index + 1} (https://...)`}
              />
            ))}
          </div>
        </div>

        <button className="btn btn-primary mt-4 w-100" onClick={handleAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddCar;
