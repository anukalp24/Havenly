import React from "react";
import Navbar from "../../Navbar/Navbar";
import "./Email-Verification.css";
import { info } from "../..";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const EmailVerification = () => {
const navigate = useNavigate()
const [otp, setotp] = useState("")
const [loader, setloader] = useState(false)
const [message, setmessage] = useState("")



const handleadd =  async (e)=>{

  try {
    setmessage("")
    setloader(true)
 e.preventDefault();

const email = localStorage.getItem("email")
if(!email){
  return navigate("/auth")
}

    
  const verify = await fetch(`${import.meta.env.VITE_API_URL}/email-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
       otp,
        email: localStorage.getItem("email")
    }),
  });
  const verifyReq = await verify.json()
  if (verify.ok) {
navigate("/")
  }

else{
  setmessage(verifyReq.message)
  return
}

}
  
  catch (error) {
   setmessage(error.message)
    return
  }

  finally{
    setloader(false)
  }

  }
  

 
  return (
    <div>
      <Navbar />
      <div className="otp-container">
        <div className="otp-card">
          <div className="otp-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
          </div>

          <h2>Verify Your Email</h2>
          <p className="otp-subtitle">
            We've sent a 6-digit code to
            <span className="otp-email">{localStorage.getItem("email")}</span>
          </p>

          <form>
            <div className="otp-input-group">
<OtpInput
        value={otp}
        onChange={setotp}
        numInputs={6}
        renderSeparator={<span style={{ width: "10px" }}></span>}
        renderInput={(props) => (
          <input
            {...props}
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        )}
      />

            </div>

{message &&(
  <p>{message}</p>
)}
            <button onClick={handleadd} type="button" className="otp-verify-btn">

              {loader ? (

                <>
                
                <div className="loader-2"></div>
                
                </>
              ):(
                <>
                Verify Email
              
                </>
              )}
            </button>
          </form>

          

          <p  onClick={()=>navigate("/auth")} className="otp-back">Back to Login</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
