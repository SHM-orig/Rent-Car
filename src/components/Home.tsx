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
      <div className="hero">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.desc}</p>
              <button className="hero-btn">ПОДРОБНЕЕ</button>
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

      <div className="center-back">
        {" "}
        <h3>
          <p>Купить электромобили и автомобили по</p>
          <p>низким ценам прямиком из Китая вы</p>
          <p>можете у нас</p>
        </h3>{" "}
      </div>

      <div className="filter-bar">
        <div className="filter-left">
          <button className="filter-btn">БРЕНД</button>
          <button className="filter-btn">ЦЕНА</button>
          <button className="filter-btn wide">ТИП ДВИГАТЕЛЯ</button>
          <button className="filter-btn">КУЗОВ</button>
        </div>

        <div className="filter-right">
          <div className="search-box">
            <input type="text" placeholder="Поиск" />
            <img
              src="https://static.tildacdn.one/tild6230-6563-4264-a137-313663336332/magnifying-glass-sol.svg"
              alt="search"
            />
          </div>

          <select className="sort-select">
            <option>Порядок: по умолчанию</option>
            <option>Сначала дешевле</option>
            <option>Сначала дороже</option>
          </select>
        </div>
      </div>

      <div className="catalog-wrapper">
        {cars.map((car) => (
          <Link
            key={car.id}
            to={`/car/${car.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="catalog-card card shadow p-3">
              {car.images && car.images.length > 0 && (
                <div className="card-img-wrapper">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="card-img main-img"
                  />

                  {car.images[1] && (
                    <img
                      src={car.images[1]}
                      alt="hover"
                      className="card-img hover-img"
                    />
                  )}
                </div>
              )}

              <h5>
                {car.name} {car.model}
              </h5>
              <p className="text-muted">{car.price} so'm</p>
              {car.rented && <div className="rented-badge">RENTED</div>}

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
  );
};

export default Home;
