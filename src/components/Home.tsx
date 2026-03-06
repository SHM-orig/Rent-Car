import car1 from "../images/car1.jpg";
import car2 from "../images/car2.jpg";
import "../index.css";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

type Car = {
  id: string;
  name: string;
  price: string;
  model: string;
  images?: string[];
  ownerId?: string;
  rented?: boolean;
};

const slides = [
  {
    id: 1,
    title: "Zeekr 9X",
    desc: "Zeekr 9X — это флагманский полноразмерный люксовый SUV.",
    image: car1,
  },
  {
    id: 2,
    title: "BMW i7",
    desc: "Современный электрический седан премиум класса.",
    image: car2,
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Rostdan ham o‘chirasizmi?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "cars", id));
      alert("O‘chirildi ✅");
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi");
    }
  };

  useEffect(() => {
    const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setCars(
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Car, "id">),
          id: doc.id,
        }))
      );
    });

    return () => unsub();
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div>
      <div className="hero text-light">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              <button className="hero-btn text-light">ПОДРОБНЕЕ</button>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <div className="arrow left" onClick={prevSlide}>
          ❮
        </div>
        <div className="arrow right" onClick={nextSlide}>
          ❯
        </div>

        {/* Dots */}
        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === current ? "dot active-dot" : "dot"}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

      <div className="catalog-section">

  <div className="catalog-header text-light">
    <h2>Премиум автомобили</h2>
    <p>Выбери машину своей мечты</p>
  </div>

  <div className="catalog-grid">
    {cars.map((car) => (
      <Link
        key={car.id}
        to={`/car/${car.id}`}
        className="car-card"
      >

        <div className="car-img-wrapper">

          <img
            src={car.images?.[0]}
            alt={car.name}
          />

          {car.rented && (
            <div className="rented-tag">
              RENTED
            </div>
          )}

        </div>

        <div className="car-info">

          <h3>
            {car.name} {car.model}
          </h3>

          <p className="price">
            {car.price} so'm / day
          </p>

          {(auth.currentUser?.uid === car.ownerId ||
                auth.currentUser?.email ===
                  "muhammadsharifjonov11@gmail.com") && (
                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/edit/${car.id}`);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(car.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}

        </div>

      </Link>
    ))}
  </div>

</div>
    </div>
  );
};

export default Home;
