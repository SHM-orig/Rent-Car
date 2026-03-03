import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

type Car = {
  name: string;
  model: string;
  price: string;
  color: string;
  mileage: string;
  engine: string;
  body: string;
  horsepower: string;
  speed: string;
  images?: string[];
  ownerId?: string;
  rented?: boolean;
  phone?: string;
};

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;

      const docRef = doc(db, "cars", id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setCar(snapshot.data() as Car);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) return <h2 className="loading">Loading...</h2>;

  const next = () => {
    if (!car.images) return;
    setCurrent((prev) =>
      prev === car.images!.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    if (!car.images) return;
    setCurrent((prev) =>
      prev === 0 ? car.images!.length - 1 : prev - 1
    );
  };

  // 🔥 RENT TOGGLE (faqat owner uchun)
  const handleToggleRent = async () => {
    if (!id || !auth.currentUser) return;
    if (auth.currentUser.uid !== car.ownerId) return;

    try {
      await updateDoc(doc(db, "cars", id), {
        rented: !car.rented,
      });

      setCar({ ...car, rented: !car.rented });
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="detail-container">
      <div className="detail-left">
        {car.images && car.images.length > 0 && (
          <>
            <div className="big-image">
              <img src={car.images[current]} alt="car" />

              {car.images.length > 1 && (
                <>
                  <button className="arrow left" onClick={prev}>❮</button>
                  <button className="arrow right" onClick={next}>❯</button>
                </>
              )}
            </div>

            <div className="thumbs d-flex flex-wrap">
              {car.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={index === current ? "active-thumb" : ""}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="detail-right">
        <h2>{car.name} {car.model}</h2>
        <h3 className="price">{car.price} so'm/kuniga</h3>

        <div className="spec"><span>Speed:</span> {car.speed}</div>
        <div className="spec"><span>Color:</span> {car.color}</div>
        <div className="spec"><span>Mileage:</span> {car.mileage}</div>
        <div className="spec"><span>Engine:</span> {car.engine}</div>
        <div className="spec"><span>Body:</span> {car.body}</div>
        <div className="spec"><span>Horsepower:</span> {car.horsepower}</div>

        <div className="spec">
          <span>Owner phone:</span> {car.phone}
        </div>

        {/* 🔥 Owner rent toggle */}
        {auth.currentUser?.uid === car.ownerId && (
          <button
            onClick={handleToggleRent}
            className={car.rented ? "rent-off-btn" : "rent-on-btn"}
          >
            {car.rented ? "REMOVE RENTED" : "MARK AS RENTED"}
          </button>
        )}

        {car.rented && (
          <div className="rented-box">🚫 RENTED</div>
        )}
      </div>
    </div>
  );
};

export default CarDetail;