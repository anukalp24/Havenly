import React from "react";
import "./Bookings.css";
import fetchWithRefresh from "../../../Utils/fetchWithRefresh";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { CalendarDays, MapPin, CreditCard, Loader2 } from "lucide-react";

const Bookings = () => {








  const navigate = useNavigate();
  const [bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const bookingFunc = async () => {
      try {
        const bookedHomes = await fetchWithRefresh(
          `http://localhost:4090/bookings`,
          {
            method: "GET",
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
            credentials: "include",
          },
        );
        if (!bookedHomes || !bookedHomes.ok) {
          setbookings([]);
        } else {
          const homes = await bookedHomes.json();
          setbookings(homes);
          setLoading(false);
        }
      } catch (error) {
        setbookings([]);
      } finally {
        setLoading(false);
      }
    };
    bookingFunc();
  }, []);

  const handleDelete = async (id) => {
    const req = await fetchWithRefresh(
      `http://localhost:4090/cancel-booking/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
        credentials: "include",
      },
    );

    if (req.ok) {
      const deleted = bookings.filter((booking) => booking._id !== id);
      setbookings(deleted);
    }
  };



















  return (
    <>
      <Navbar />
      <main className="booking-page">
        <div className="booking-container">
          <div className="booking-header">
            <h1>Your Bookings</h1>
            <p className="booking-subtitle">Trips you've booked</p>
          </div>

          {bookings.length === 0 ? (
            <div className="booking-empty">
              <div className="booking-empty-icon">{/* SVG */}</div>

              <h2>No Bookings Yet</h2>

              <button  id="booking-now" onClick={() => navigate("/stays")}>
                Explore Stays
              </button>
            </div>
          ) : (
            <div className="booking-list">
              {bookings.map((booking) => (
                <div  onClick={()=>navigate(`/bookingDetails/${booking._id}`)} className="booking-grid-card" key={booking._id}>
                  <div className="booking-grid-image">
                    <img src={booking.files[0]} alt={booking.propertyName} />

                    <span
                      className={`booking-status ${
                        booking.paymentStatus === "Paid"
                          ? "booking-status-paid"
                          : "booking-status-refund"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>

                  <div className="booking-grid-content">
                    <h2>{booking.propertyName}</h2>

                    <p className="booking-city">📍 {booking.cityname}</p>

                    <p className="booking-host">
                      Hosted by <strong>{booking.owner.name}</strong>
                    </p>

                    <div className="booking-bottom">
                      <span className="booking-price">
                        ₹{booking.totalPrice}
                      </span>

                      <button
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Bookings;
