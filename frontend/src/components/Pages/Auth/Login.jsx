import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImg from "../../../assets/photos/loginpage.png";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaBullseye } from "react-icons/fa6";
const Login = () => {
  const navigate = useNavigate();
const [loader, setloader] = useState(false)
  const [message, setmessage] = useState({});
const [backendError, setbackendError] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    islogin: false,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });


    setmessage({
      ...message , [e.target.name] : ""
    })
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    
    
    
    
    
    
    try {
      setloader(true)
      const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

     
    if (form.islogin === false) {
      let newErrors = {};

if (!form.name.trim()) {
  newErrors.name = "Name is required";
}

if (!form.email.trim()) {
  newErrors.email = "Email is required";
}

if (!form.password.trim()) {
  newErrors.password = "Password is required";
}

else if (!strongPassword.test(form.password)) {
  newErrors.password =
    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.";
}

setmessage(newErrors);


if ( newErrors.name || newErrors.email || newErrors.password) {
  setloader(false)
  return;
}


      const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const result = await response.json();
setloader(false)
      if (response.ok) {
        // localStorage.setItem("email", form.email);
        localStorage.setItem("accessToken" , result.accessToken)
        // navigate("/email-verification");
        navigate("/")

      } else {
        setbackendError(result.message)
      }
    } 
    
    
    else {
  
      const newErrors = {}

if (!form.email.trim()) {
  newErrors.email = "Email is required";
}

if (!form.password.trim()) {
  newErrors.password = "Password is required";
}

else if (!strongPassword.test(form.password)) {
  newErrors.password =
    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.";
}

setmessage(newErrors);

if (newErrors.email || newErrors.password) {
  setloader(false)
  return;
}




      const request = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const result = await request.json();
setloader(false)
      if (request.status === 429) {
        setbackendError(result.message);
        return;
      }
      if (request.ok) {
        localStorage.setItem("accessToken", result.accessToken);

        navigate("/dashboard");
      } else {
        setbackendError(result.message)
      }
    }
    } catch (error) {
      setbackendError(error.message)
    }
    finally{
      setloader(false)
    }
  };












  return (
    <div>
      <div>
        <div className="login-container">
          <img src={loginImg} alt="" />
          <div className="login-left">
            <h1>Your Next Escape Awaits</h1>
            <p>
              Sign in to discover handpicked stays and unforgettable
              experiences.
            </p>
          </div>

          <div className="login-right">
            <div className="auth-box">
              {form.islogin ? (
                <>
                  <HiOutlineArrowLeft
                    onClick={() => navigate("/")}
                    className="back-btn"
                  />
                  <h2>Welcome Back</h2>

                  <p className="auth-subtitle">
                    Login to continue your journey with Havenly.
                  </p>

                  <form onSubmit={handleLogin}>
                    <div className="input-group">
                      <label>Email Address</label>

                      <input
                        type="email"
                        name="email"
                        placeholder="john24@gmail.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                     {message?.email && (
  <p className="auth-field-error">{message.email}</p>
)}
                    </div>

                    <div className="input-group">
                      <label>Password</label>

                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                      />

                      {message?.password && (
  <p className="auth-field-error">{message.password}</p>
)}
                   
                    </div>

                    <p
                      className="forgot-password"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot Password?
                    </p>

                    <button type="submit" className="login-btn">
                      {loader ? (
                        <>
                        <div className="loader-2"></div>
                        </>
                      ): (
                        <>
                        Login
                        </>
                      )}
                    </button>

                  
                  </form>

                  <div className="switch-auth">
                    <span>Don't have an account?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setForm({
                          ...form,
                          islogin: false,
                        });
                        setmessage({}); setbackendError("");
                      }}
                    >

                     
                        
                        Sign Up
                        
                  
                    </button>
                  </div>

{backendError && (
  <p id="backend-error">{backendError}</p>
)}
                </>
              ) : (
                <>
                  <HiOutlineArrowLeft
                    onClick={() => navigate("/")}
                    className="back-btn"
                  />

                  <h2>Havenly</h2>

                  <p className="auth-subtitle">Create Your Account.</p>

                  <form onSubmit={handleLogin}>
                    <div className="input-group">
                      <label>Full Name</label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                      />
{message?.name && (
  <p className="auth-field-error">{message.name}</p>
)}
                      
                    </div>

                    <div className="input-group">
                      <label>Email Address</label>

                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    {message?.email && (
  <p className="auth-field-error">{message.email}</p>
)}
                    </div>

                    <div className="input-group">
                      <label>Password</label>

                      <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                      />
                     
                        {message?.password && (
  <p className="auth-field-error">{message.password}</p>
)}  
                    </div>

                    

                    <button type="submit" className="login-btn">
                      {loader ? (
                        <>
                        <div className="loader-2"></div>
                        
                        
                        </>
                      ):(

                        <>
                        Create Account
                        
                        </>
                      )}
                    </button>
                  </form>

                  <div className="switch-auth">
                    <span>Already have an account?</span>

                    <button
                      type="button"
                      onClick={() => {
                        setForm({
                          ...form,
                          islogin: true,
                        })
                        ; setmessage({}) ; setbackendError("");
                      }
                      }
                    >
                      Login
                    </button>
                  </div>

                  {backendError && (
  <p id="backend-error">{backendError}</p>
 )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
