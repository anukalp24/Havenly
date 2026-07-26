import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImg from "../../../../dist/assets2/images/loginpage.png";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Navbar from "../../Navbar/Navbar";
const Login = () => {
  const navigate = useNavigate();

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
  return;
}






      const response = await fetch("http://localhost:4090/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/email-verification");

        localStorage.setItem("email", form.email);
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
  return;
}




      const request = await fetch("http://localhost:4090/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const result = await request.json();

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
                      Login
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
                      Create Account
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
