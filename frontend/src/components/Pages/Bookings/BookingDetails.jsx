import React from "react";
import { useState, useEffect } from "react";
import "./BookingDetails.css";
import { useNavigate } from "react-router-dom";
import fetchWithRefresh from "../../../Utils/fetchWithRefresh";
import HomeDetailsSkeleton from "../../../Utils/HomeDetailsSkeleton";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
const BookingDetails = () => {
  const { _id } = useParams();

  const [bookingDetail, setbookingDetail] = useState(null);
  const [loader, setloader] = useState(true)
const [error, seterror] = useState("")
const [cancelLoader, setcancelLoader] = useState(false)
  const navigate = useNavigate();
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




  const HandleCancel = async (id) => {
    setcancelLoader(true)
    const req = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/cancel-booking/${id}`, {
      method: "put",
      credentials: "include",
    });
    const response = await req.json();
    
    if(req.ok){
    setbookingDetail(response);
    setloader(false)
}
else{
  setloader(false)
seterror(response.message)
}
setcancelLoader(false)
}



  useEffect(() => {
    const bookingFunction = async () => {
      const request = await fetchWithRefresh(
        `${import.meta.env.VITE_API_URL}/bookingDetails/${_id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      let result = await request.json();
      setbookingDetail(result);
      setloader(false)
    };

    bookingFunction();
  }, []);



  return (
    <div>
      <Navbar />









{loader ? (

  <>
  <HomeDetailsSkeleton/>
  </>
): (


  <>
      {bookingDetail ? (
        <div className="hd-wrapper">
          <div className="hd-gallery-wrapper">
            <div className="hd-gallery">
              <div className="hd-gallery-left">
                <img id="img" src={bookingDetail?.home?.files?.[0]} alt="" />
              </div>

              <div className="hd-gallery-right">
                <img
                  id="img"
                  src={
                    bookingDetail?.home?.files?.[1] ||
                    bookingDetail?.home?.files?.[0]
                  }
                  alt=""
                />

                <img
                  id="img"
                  src={
                    bookingDetail?.home?.files?.[2] ||
                    bookingDetail?.home?.files?.[0]
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
              <h1 className="hd-title">{bookingDetail?.home?.propertyName}</h1>

              <p className="hd-location">📍 {bookingDetail?.home?.cityname}</p>

              <div className="hd-about">
                <h2>About this Place</h2>

                <p>{bookingDetail?.home?.desc}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hd-sidebar">
              <div className="booking-card">
                
                <p className="guest-name">
                  Owner name:{" "}
                  <strong>{bookingDetail?.home?.owner?.name}</strong>
                </p>

            

                {/* <p className="booking-msg">{message}</p> */}

                <div className="price-breakdown">


                  <div className="price-row">
                 <span>Accommodation: ₹{Number(bookingDetail?.home?.totalPrice).toLocaleString("en-IN")}</span>
              
                  </div>


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
                      ₹{Number((bookingDetail?.home?.totalPrice || 0) + 800).toLocaleString("en-IN")}
                    </strong>
                  </div>
                  {bookingDetail?.home?.status === "cancelled" ? (
                    <>
                      <div className="reservation-cancelled">
                        <div className="cancel-icon">✓</div>

                        <h3>Booking Cancelled</h3>

                        <p>{bookingDetail?.home?.guestMessage}</p>

                        <div className="refund-info">
                          💳 A full refund has been initiated and will be
                          processed shortly.
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        className="book-btn"
                        onClick={() => HandleCancel(bookingDetail?.home?._id)}
                      >

                        {cancelLoader ? (

                          <>
                          <div className="loader-2"></div>
                          </>
                        ) : (

                          <>
                        Cancel the Booking
                          </>
                        )}
                      </button>
                    </>
                  )}
                  
                </div>
                <p>{error}</p>
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

      </>
)}
      <Footer />
    </div>
  );
};

export default BookingDetails;
