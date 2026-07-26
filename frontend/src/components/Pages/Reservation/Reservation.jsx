import React from 'react'
import { useState , useEffect } from 'react'
import fetchWithRefresh from '../../../Utils/fetchWithRefresh'
import Navbar from '../../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import "./Reservation.css"



const Reservation = () => {
const [reservedHomes, setreservedHomes] = useState([])
const navigate = useNavigate()

useEffect(() => {
    const  reservation = async ()=>{

    const reservationReq = await  fetchWithRefresh("http://localhost:4090/reservations" , {
    headers: {
         "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken")
    } ,
    method: "GET",
    credentials: "include"
    })

    if(reservationReq.ok){
        const reservedHomes = await reservationReq.json()
        setreservedHomes(reservedHomes)

    }

if(reservedHomes?.home?.status === "cancelled"){
setIsCancel(true)
 
}

    }
 reservation()
}, [])




  return (
    <>
      <Navbar />

      <main className="reservation-page">
        <div className="reservation-container">

          <div className="reservation-header">
            <h1>Your Reservations</h1>
            <p className="reservation-subtitle">
              Bookings received for your properties
            </p>
          </div>

          {reservedHomes.length === 0 ? (
            <div className="reservation-empty">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h2>No Reservations Yet</h2>
              <button onClick={()=>navigate("/")} id='book-now'>Back to home</button>
            </div>
          ) : (

            



            <div  className="reservation-list">
              {reservedHomes.map((home) => (
                <div  onClick={() =>
          navigate(`/reservationDetails/${home._id}`)
        }
  className="reservation-grid-card"
  key={home._id}
>

  {home.status === "cancelled" &&(
<div className='cancelled'>
    <div className="cancelled-banner">
      {home?.ownerMessage}
    </div>
</div>
)}

  
  
  
  <div className="reservation-grid-image">

    <img src={home.files[0]} alt={home.propertyName} />

    <span
      className={`reservation-status ${
        home.paymentStatus === "Paid"
          ? "status-paid"
          : "status-refund"
      }`}
    >
      {home.status}
    </span>

  </div>

  <div className="reservation-grid-content">

    <h2>{home.propertyName}</h2>

    <p className="reservation-city">
      📍 {home.cityname}
    </p>

    <p className="reservation-guest">
      Booked by <strong>{home.guest.name}</strong>
    </p>

    <div className="reservation-bottom">

      <span className="reservation-price">
        ₹{home.totalPrice}
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
  )
}

export default Reservation
