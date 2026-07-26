import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchWithRefresh from "../../../Utils/fetchWithRefresh";
import Navbar from "../../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import "./ReservationDetails.css";

const ReservationDetails = () => {
  const [reservationDetails, setreservationDetails] = useState({});
  const [error, seterror] = useState("")
  const { _id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const reservationfunc = async () => {
      const reservationDetails = await fetchWithRefresh(
        `http://localhost:4090/reservationDetails/${_id}`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
          credentials: "include",
        },
      );

      const result = await reservationDetails.json();
      setreservationDetails(result);
    };
    reservationfunc();
  }, []);


  const HandleCancel = async (id) => {
    const req = await fetchWithRefresh(
      `http://localhost:4090/cancel-reservations/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
        credentials: "include",
      },
    );

    const result = await req.json();

    if(req.ok){
      setreservationDetails(result);
    }
    else{
      seterror(result.message)
    }
  };


  const handleshare = async () => {
    try {
      await navigator.share({
        title: "UrbanStay",
        text: "Check out this amazing property!",
        url: window.location.href,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {reservationDetails ? (
        <div className="hd-wrapper">
          <div className="hd-gallery-wrapper">
            <div className="hd-gallery">
              <div className="hd-gallery-left">
                <img
                  id="img"
                  src={reservationDetails?.home?.files?.[0]}
                  alt=""
                />
              </div>

              <div className="hd-gallery-right">
                <img
                  id="img"
                  src={
                    reservationDetails?.home?.files?.[1] ||
                    reservationDetails?.home?.files?.[0]
                  }
                  alt=""
                />

                <img
                  id="img"
                  src={
                    reservationDetails?.home?.files?.[2] ||
                    reservationDetails?.home?.files?.[0]
                  }
                  alt=""
                />
              </div>
            </div>

            <div className="hd-gallery-actions">
              <button className="gallery-icon" onClick={handleshare}>
                <svg viewBox="0 0 50 50" fill="currentColor">
                  <path d="M38.288 10.297l1.414 1.415-14.99 14.99-1.414-1.414z" />
                  <path d="M40 20h-2v-8h-8v-2h10z" />
                  <path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z" />
                </svg>
              </button>
              <div className="gallery-swipe-hint">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="hd-content">
            {/* LEFT */}

            <div className="hd-left">
              <h1 className="hd-title">
                {reservationDetails?.home?.propertyName}
              </h1>

              <p className="hd-location">
                📍 {reservationDetails?.home?.cityname}
              </p>

              <div className="hd-about">
                <h2>About this Place</h2>

                <p>{reservationDetails?.home?.desc}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hd-sidebar">
              <div className="booking-card">
                <div className="booking-price">
                  <h2>₹{reservationDetails?.home?.totalPrice}</h2>

                  <span>/ Night</span>
                </div>
                <p className="guest-name">
                  Booked by{" "}
                  <strong>{reservationDetails?.home?.guest?.name}</strong>
                </p>
                

                <div className="booking-grid"></div>

                {/* <p className="booking-msg">{message}</p> */}

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Cleaning Fee</span>
                    <span>₹500</span>
                  </div>

                  <div className="price-row">
                    <span>Service Fee</span>
                    <span>₹300</span>
                  </div>

                  <hr />

                  <div className="price-total">
                    <strong>Total</strong>

                    <strong>
                      ₹{Number(reservationDetails?.home?.totalPrice || 0) + 800}
                    </strong>
                  </div>

                  {reservationDetails?.home?.status === "cancelled" ? (
                    <>
                      <div className="reservation-cancelled">
                        <div className="cancel-icon">✓</div>

                        <h3>Booking Cancelled</h3>

                        <p id="backend-msg">{reservationDetails?.home?.ownerMessage}</p>
                        

                        <div className="refund-info">
                          💳 A full refund has been initiated and will be
                          processed shortly.
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      className="book-btn"
                      onClick={() =>
                        HandleCancel(reservationDetails?.home?._id)
                      }
                    >
                      Cancel the reservation
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboardhomesdetails-empty">
          <div className="dashboardhomesdetails-empty-card">
            <div className="dashboardhomesdetails-empty-icon">🏠</div>

            <h2>Property Not Found</h2>

            <p>This booking may have been deleted or is no longer available.</p>
            <button
              className="dashboardhomesdetails-back-btn"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
export default ReservationDetails;
