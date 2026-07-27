import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState , useContext } from "react";
import "./HomeDetails.css";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import fetchWithRefresh from "../../../Utils/fetchWithRefresh";
import { FiHeart } from "react-icons/fi";
import { info } from "../..";

const Home = () => {

const {handlewishlist} = useContext(info)
  const { id } = useParams();
  const [home, sethome] = useState(null);
  const [checkIn, setcheckIn] = useState(null);
  const [checkOut, setcheckOut] = useState(null);
  const [message, setmessage] = useState("");
  const [IsSuccess, setIsSuccess] = useState(null)
const [loader, setloader] = useState(false)

const [checker, setchecker] = useState("")




  useEffect(() => {
    const homefunc = async () => {
      const request = await fetch(`${import.meta.env.VITE_API_URL}/home/${id}`, {
        method: "GET",
        headers:{
          authorization: localStorage.getItem("accessToken")
        } ,

        credentials: "include",
      });
      const result = await request.json();
      sethome(result);
    };
    homefunc();
  }, []);


  
  const handleadd = async (id) => {
    setloader(true)
  setmessage("")
setchecker("")
setIsSuccess(null);

    try {
      if (!checkIn || !checkOut) {
        return setchecker("Please select check-in and check-out dates.");
      }

     
      const createCheckoutSession = await fetchWithRefresh(
        `${import.meta.env.VITE_API_URL}/create-checkout-session/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken"),
          },
          method: "POST",
          body: JSON.stringify({
            checkIn: checkIn,
            checkOut: checkOut,
          }),
          credentials: "include",
        },
      );
  
      const data = await createCheckoutSession.json();
      console.log(createCheckoutSession.status);
      console.log(data);
  
      if (createCheckoutSession.ok) {
        setIsSuccess(true)
        setmessage(data.message);
        window.location.href = data.url;
      }

      else{
        setIsSuccess(false)
        setmessage(data.message);
      }
      
    }
     catch (error) {
      return setmessage(error.message)
    }


   finally{
    setloader(false)
   }

  }


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
      <Navbar/>
<div className="hd-wrapper">

  <div className="hd-gallery-wrapper">

    <div className="hd-gallery">

      <div className="hd-gallery-left">
        <img id="img"
          src={home?.home?.files?.[0]}
          alt=""
        />
      </div>

      <div className="hd-gallery-right">

        <img id="img"
          src={home?.home?.files?.[1] || home?.home?.files?.[0]}
          alt=""
        />

        <img className="special-img" id="img"
          src={home?.home?.files?.[2] || home?.home?.files?.[0]}
          alt=""
        />

      </div>

    </div>

    <div className="hd-gallery-actions">

      <button
        className="gallery-icon"
        onClick={handleshare}
      >

        <svg viewBox="0 0 50 50" fill="currentColor">
          <path d="M38.288 10.297l1.414 1.415-14.99 14.99-1.414-1.414z"/>
          <path d="M40 20h-2v-8h-8v-2h10z"/>
          <path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z"/>
        </svg>

      </button>




<button
  className="wishlist-icon"
  onClick={(e) => {
    e.stopPropagation();

    e.currentTarget.classList.remove("burst");
    void e.currentTarget.offsetWidth; 
    e.currentTarget.classList.add("burst");

    handlewishlist(home.home._id);
  }}
>
  <FiHeart />
  <span className="particle p1"></span>
  <span className="particle p2"></span>
  <span className="particle p3"></span>
  <span className="particle p4"></span>
  <span className="particle p5"></span>
  <span className="particle p6"></span>
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
      {home?.home?.propertyName}
    </h1>

    <p className="hd-location">
      📍 {home?.home?.cityname}
    </p>

    <div className="hd-about">

      <h2>About this Place</h2>

      <p id="description">
        {home?.home?.desc}
      </p>

    </div>

  </div>



  {/* RIGHT */}
<div className="hd-sidebar">

  <div className="booking-card">

    <div className="booking-price">

      <h2>₹{Number(home?.home?.price).toLocaleString("en-IN")}</h2>
      <span>/ Night</span>

    </div>

    <div className="booking-grid">

      <div className="booking-box">

        <label>CHECK-IN</label>

        <DatePicker
          selected={checkIn}
          minDate={new Date()}
          onChange={setcheckIn}
          placeholderText="Add Date"
        />

      </div>

      <div className="booking-box">

        <label>CHECK-OUT</label>

        <DatePicker
          selected={checkOut}
          minDate={new Date()}
          onChange={setcheckOut}
          placeholderText="Add Date"
        />

      </div>

     <p id="checker">{checker}</p>

    </div>

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
          ₹{Number(home?.home?.price || 0) + 800}
        </strong>
      </div>

    <button
      className="book-btn"  disabled={loader}
      onClick={() => handleadd(home?.home?._id)}
      >
        {loader ? (
          <>
    <div className="loader-2"></div>
          </>
        ) : (
          <>
          Reserve Now
          </>
        )}
      
    </button>

    <p className={ IsSuccess === true ?  "booking-msg" : "booking-msg-error"}>{message}</p>

    </div>

  </div>

</div>
</div> {/* hd-content */}

</div> {/* hd-wrapper */}

<Footer />

</>
       
  );
};

export default Home;
