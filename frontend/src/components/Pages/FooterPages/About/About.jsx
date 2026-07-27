import React from 'react'
import Navbar from '../../../Navbar/Navbar'
import Footer from '../../../Footer/Footer'
import image from "../../../../assets/photos/About.png"
import "./About.css"
import { useNavigate } from 'react-router-dom'
const About = () => {
const navigate = useNavigate()

  return (
    <>
      <Navbar />
<section className="about">

    <div className="about-left">



        <h2>
            Escape the ordinary.
            <br />
            Stay somewhere unforgettable.
        </h2>

        <p>
            At Havenly, we believe every getaway deserves more than just a place to sleep.
            We carefully curate premium villas, cabins and unique homes that combine
            comfort, luxury and unforgettable experiences. From discovering the perfect
            stay to booking with confidence, Havenly makes every journey effortless.
        </p>

        <div className="about-features">

            <div className="feature">
                ✔ Verified Properties
            </div>

            <div className="feature">
                ✔ Trusted Hosts
            </div>

            <div className="feature">
                ✔ Secure Payments
            </div>

            <div className="feature">
                ✔ Instant Booking
            </div>

        </div>

        <button onClick={()=>navigate("/stays")} className="about-btn">
            Explore Stays
        </button>

    </div>


    <div className="about-right">

        <img src={image} alt="" />

        <div className="about-card">

        

            <p>1,200+ Happy Travelers</p>

        </div>

    </div>

</section>
    
      <Footer />
    </>
  )
}

export default About
