import React, { useState } from 'react'
import "./ForgotPassword.css"
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
const ForgotPassword = () => {
    const [reset, setreset] = useState({
        email: ""
    })

    const [loader, setloader] = useState(false)
    const [message, setmessage] = useState("")
const [empty, setempty] = useState("")

    const handlechange = (e) => {
setmessage("")
setempty("")
        setreset({ ...reset, [e.target.name]: e.target.value })
    }

    const forgetPassword = async () => {
        setempty("")
        setmessage("")
        if(reset.email === ""){
            setempty("Email is required")
            return
        }
        
        setloader(true)

        const request = await fetch(`${import.meta.env.VITE_API_URL}/forget-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reset)
        })

        const result = await request.json()
setloader(false)
        if (request.ok) {
            setmessage(result.message)
        } else {
            setmessage(result.message)
        }
    }

    return (
        <>
        <Navbar/>
<div className="fp-container">
  <div className="fp-box">

    <div className="fp-header">
      <h2 className="fp-title">Forgot Password?</h2>
      <p className="fp-subtitle">
        Enter your email address and we'll send you a reset token
      </p>
    </div>

    <div className="fp-input-group">


      <input
        className="fp-input"
        value={reset.email}
        name="email"
        onChange={handlechange}
        placeholder="Enter your email"
        type="email"
      />

    </div>

    <button
      className="fp-btn"   disabled={loader}
      onClick={forgetPassword}
    >
        {loader ? (
            <>
            <div className="loader-2"></div>
            </>
        ) : (
<>
Send Reset Link 
</>
        )}
    </button>

    {message && (
      <p className="fp-message">
        {message}
      </p>
    )}

    {empty && (
      <p className="fp-error">
        {empty}
      </p>
    )}

  </div>
</div>
<Footer/>
</>
    )
}

export default ForgotPassword