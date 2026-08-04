import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import "./Contact.css";

const Contact = () => {
  const [loader, setloader] = useState(false)
  const [message, setMessage] = useState("");
const [error, seterror] = useState({})
  const [first, setFirst] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const handlechange = (e) => {
      setMessage("")

    seterror({... error , [e.target.name] : ""})
    setFirst({ ...first, [e.target.name]: e.target.value });
  };

  
  const handleadd = async (e) => {

    setMessage("")
    setloader(true)
    e.preventDefault();
const errors = {}

if(first.name === ""){
  errors.name = "Name is required"
}
if(first.email === ""){
  errors.email = "Email is required"
}
if(first.phoneNumber === ""){
  errors.phoneNumber = "PhoneNumber is required"
}
if(first.subject === ""){
  errors.subject = "Subject is required"
}
if(first.message === ""){
  errors.message = "Message is required"
}
 seterror(errors)

  if(Object.keys(errors).length > 0){
    setloader(false)
    return
  }
  

    const request = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: "POST",
     headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(first),
    });

    if(request.ok){
      setloader(false)
      const result = await request.json();
      setMessage(result.message);
  
      setFirst({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    }

  };

  return (
    <>
      <Navbar />

      <section className="contact">

        <div className="contact-left">

          

          <h1>
            Let's Plan Your
            <br />
            Next Escape.
          </h1>

          <p>
            Have questions about bookings, hosting or partnerships?
            Our team is always here to help you plan the perfect getaway.
          </p>

          <div className="contact-info">

            <div className="info-box">
              <FiMail className="info-icon" />
              <div>
                <h3>Email</h3>
                <p>havenly24@gmail.com</p>
              </div>
            </div>

            <div className="info-box">
              <FiPhone className="info-icon" />
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-box">
              <FiMapPin className="info-icon" />
              <div>
                <h3>Location</h3>
                <p>Mumbai, India</p>
              </div>
            </div>

          </div>

        </div>

        <div className="contact-right">

          <form onSubmit={handleadd} className="contact-form">

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={first.name}
              onChange={handlechange}
            />
{error.name &&<p className="error" >Name is required</p>}
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={first.email}
              onChange={handlechange}
            />
{error.email &&<p className="error" >Email is required</p>}
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={first.phoneNumber}
              onChange={handlechange}
            />
{error.phoneNumber &&<p className="error" >phoneNumber is required</p>}
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={first.subject}
              onChange={handlechange}
            />
{error.subject &&<p className="error" > Subject is required</p>}
            <textarea
              rows="6"
              placeholder="Write your message..."
              name="message"
              value={first.message}
              onChange={handlechange}
            />
{error.message &&<p className="error" >Message is required is required</p>}




 <button id="btn" type="submit">
{loader ? (
   <div className="loader-2"></div>
) : (
  <>
  <FiSend />
      Send Message
  </>

)}
 </button>

            {message && (
              <p className="success">
                {message}
              </p>
            )}

          </form>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Contact;