import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Hero from '../../Hero-Section/Hero'
import Footer from '../../Footer/Footer'
import { info } from '../..'
import { useNavigate } from 'react-router-dom'
import {  useContext , useEffect  , useState} from 'react'
import photo from "../../../assets/photos/photo2.png"
import "./Home.css"
import {
  HiHome,
  HiShieldCheck,
  HiCreditCard,
  HiStar,
  HiArrowUpRight
} from "react-icons/hi2";



import {
  Home,
  Trees,
  Building2,
  House,
  Tractor,
  Bed,
  KeyRound,
} from "lucide-react";


const HomeDetails = () => {
  const navigate = useNavigate()
  const Navigate = useNavigate()
const {handleStay , handlewishlist } = useContext(info)
const [featuredHomes, setfeaturedHomes] = useState([])


useEffect(() => {
const FetchHomes = async ()=>{
    const api =   await fetch(`http://localhost:4090/`)
    const result  = await api.json()
    setfeaturedHomes(result)
}
FetchHomes()
}, [])




const categories = [
  {name: "Villa" , icon: <Home size={24}/>},
  { name: "Cabin", icon: <Trees size={24} /> },
  { name: "Flat", icon: <Building2 size={24} /> },
  { name: "Entire Home", icon: <KeyRound size={24} /> },
]

  return (
    <>
    <Navbar/>
    <Hero/>

<section className="category-section">

    <div className="category-header">


        <h2>Explore by Category</h2>
    </div>

    <div className="category-wrapper">

        {categories.map((item) => (

            <div
                key={item.name}
                className="category-pill"
                onClick={() => {
                    localStorage.setItem("category", item.name);
                    Navigate("/categories");
                }}
            >

                <div className="category-icon">
                    {item.icon}
                </div>

                <span>{item.name}</span>

            </div>

        ))}

    </div>
     
</section>
<div className="home-parent">
 

    <div className="home-intro">
        <span>Popular Stays</span>
    </div>

    <div className="home-section">

        {featuredHomes.map((val, index) => (

            <div
                key={index}
                className="home-card"
                onClick={() => handleStay(val._id)}
            >

                <div className="home-image-wrapper">

                    <img
                        src={val.files[0]}
                        alt={val.propertyName}
                        className="home-image"
                    />

                    <svg
                        onClick={(e) => {
                            e.stopPropagation();
                            handlewishlist(val);
                        }}
                        className="home-heart-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>

                 
                </div>

                <div className="home-content">

                    <h3 className="home-title">
                        {val.propertyName}
                    </h3>

                    <p className="home-location">
                        📍 {val.cityname}, {val.country}
                    </p>

                    <div className="home-bottom">

                        <div>

                            <h4 className="home-price">
                                ₹{Number(val.price).toLocaleString("en-IN")}
                            </h4>

                            <span className="home-night">
                                per night
                            </span>

                        </div>

                        <button
                            className="home-arrow"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStay(val._id);
                            }}
                        >
                            <HiArrowUpRight/>
                        </button>

                    </div>

                </div>

            </div>

        ))}

    </div>

</div>

<div className="stays-btn-container">
  <button id="stays" onClick={() => Navigate("/stays")}>
    Explore More Stays
  </button>
</div>




<section className="why-choose">
  <div className="why-header">
    <h2>Why Choose Havenly?</h2>
    <p>
      Discover a secure and seamless way to book your next stay with
      trusted properties and reliable services.
    </p>
  </div>

  <div className="why-grid">

    <div className="why-card">
      <div className="why-icon">
        <HiHome />
      </div>
      <h3>Verified Properties</h3>
      <p>
        Every listing is reviewed before being published to ensure quality
        and authenticity.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">
        <HiShieldCheck />
      </div>
      <h3>Secure Booking</h3>
      <p>
        Your account and bookings are protected using secure authentication
        and encrypted sessions.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">
        <HiCreditCard />
      </div>
      <h3>Safe Payments</h3>
      <p>
        Payments are securely processed through Stripe with encrypted
        transactions.
      </p>
    </div>

    <div className="why-card">
      <div className="why-icon">
        <HiStar />
      </div>
      <h3>Top Rated Stays</h3>
      <p>
        Browse highly rated homes and enjoy unforgettable experiences with
        confidence.
      </p>
    </div>

  </div>
</section>


<section className="partner-section">
      <div className="partner-image">
        <img
          src={photo}
          alt="Villa"
        />
      </div>

      <div className="partner-content">
        <h2>List Your Property With Us</h2>

        <div className="feature">
          <span>✔</span>
          <div>
            <h4>Higher revenue, low maintenance</h4>
            <p>Dynamic pricing, premium listings, and dedicated support.</p>
          </div>
        </div>

        <div className="feature">
          <span>✔</span>
          <div>
            <h4>Reach thousands of travellers</h4>
            <p>Get bookings from verified guests across the country.</p>
          </div>
        </div>

        <div className="feature">
          <span>✔</span>
          <div>
            <h4>Hassle-free management</h4>
            <p>We help with marketing, bookings and customer support.</p>
          </div>
        </div>

        <div className="feature">
          <span>✔</span>
          <div>
            <h4>Create memorable stays</h4>
            <p>Deliver unique experiences that guests love and recommend.</p>
          </div>
        </div>

        <button onClick={()=>navigate("/host")} className="partner-btn">
          List your property →
        </button>
      </div>
    </section>


    <Footer/>
            </>
  
  )
}

export default HomeDetails
