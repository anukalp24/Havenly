import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>





    <div className="footer-parent">

<div className="footer-section">

<div className="footer-sec-1">
    <h2>Urban-Stay</h2>
<p>Discover luxury stays and unforgettable travel experiences with UrbanStay.</p>
</div>
<div className="footer-sec-1">
    <h2>Company</h2>
  <Link to="/about">About Us</Link>
<Link to="/security-policy">Security and Privacy Policy</Link>
<Link to="/terms-and-conditions">Terms & Conditions</Link>
<Link to="/Contact">Contact Us</Link>
<Link to="/faq">FAQ</Link>
</div>


<div className="footer-sec-1">
    <h2>Account</h2>
    <Link to="/auth">Login</Link>
    <Link to="/stays">Explore Stays</Link>
    <Link to="/host">Become a host</Link>

</div>

<div className="footer-sec-1">
    <h2>Address</h2>
  <p>10, Vatika City Market, Sector 49, Sohna-Gurgaon Road, Gurgaon</p>
  <p> Contact: anukalpagarwal24@gmail.com</p>
  <p>Timing: 7:00 - 18:00, Mon - Sun</p>
  
  
</div>

</div> {/* footer-section-div */}

<div className="footer-bottom">
     <p>
            © 2026 UrbanStay. All rights reserved.
        </p>
</div>
    </div>
    
    


    
    
    
    
    
    
    
    </>
  )
}

export default Footer
