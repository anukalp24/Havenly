import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./ResetPassword.css"
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
const ResetPassword = () => {
    const { token } = useParams()    
    const navigate = useNavigate()
    const [form, setform] = useState({
        password: ""
    })

    const [loader, setloader] = useState(false)
    const [message, setmessage] = useState()
const [error, seterror] = useState()




    const handlechange = (e) => {
        setmessage("")
        seterror("")
        setform({ ...form, [e.target.name]: e.target.value })
    }
      
    const resetPassword = async () => {
setloader(true)
        if(form.password === ""){
            return seterror("Enter your new password")
        }
        const strongPassword =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

  if(!strongPassword.test(form.password)){
              return seterror("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.")
  }

        const request = await fetch(`${import.meta.env.VITE_API_URL}/reset-password/${token}`, {
            method: "POST",
           headers : { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })

        const result = await request.json()

        if (request.ok) {
            setmessage(result.message)
            navigate("/")
        } else {
            seterror(result.message)
        }
        setloader(false)
    }

    return (
<>
        <Navbar/>
       <div className="reset-container">

  <div className="reset-box">

    <div className="reset-header">
      <h2 className="reset-title">Reset your Password</h2>

      <p className="reset-subtitle">
        Create a strong new password for your Havenly account.
      </p>
    </div>

    <div className="reset-input-group">

    

      <input
        className="reset-input"
        value={form.password}
        name="password"
        onChange={handlechange}
        placeholder="Enter your new password"
        type="password"
      />
{error && (
      <p className="reset-error">
        {error}
      </p>
    )}

    {message &&(
         <p className="reset-message">
        {message}
      </p>
    )}
      
    </div>

   
<button
      className="reset-btn"   disabled={loader}
      onClick={resetPassword}
    >
        {loader ? (
            <>
            <div className="loader-2"></div>
            </>
        ) : (
<>
  Reset Password
</>
        )}
    </button>






    

  </div>

</div>
<Footer/>
</>
    )
}

export default ResetPassword