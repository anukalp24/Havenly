import React, { useEffect, useRef, useState , useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import darkLogo from "../../assets/logo/dark-logo.png"
import Mainlogo from "../../assets/logo/logo.png"
import fetchWithRefresh from "../../Utils/fetchWithRefresh";

import toast from "react-hot-toast";
import { info } from "..";
import {
  HiOutlineMenu,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineLogout,
  HiOutlineClipboardList,
  HiOutlinePlusCircle,
   HiOutlineGlobeAlt
} from "react-icons/hi";
import { MdPerson } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
const [user, setuser] = useState({})

 useEffect(() => {

 
     const profile =  async()=>{
const req = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/profile` , {
    credentials: "include"
})
const response  = await req.json()
setuser(response)
     }
     profile()
    }, [])
    


let navbarClass = "navbar"
let navbarLinkClass = "navbar-center"

let logo = Mainlogo
  const location  = useLocation()
  const isHomePage = location.pathname === "/"
  if(!isHomePage){
    navbarClass = "navbar-scrolled"
    navbarLinkClass = "navbar-center-scrolled"
    logo = darkLogo
   
  }

  else{
    navbarClass = "navbar"
  }
const navigate = useNavigate()

const [scrolled, setscrolled] = useState(false)

if(scrolled){
  navbarClass = "navbar-scrolled"
  navbarLinkClass = "navbar-center-scrolled"
logo = darkLogo
}


useEffect(() => {
 const handleScroll = ()=>{
setscrolled(window.scrollY > 100)
 }
 window.addEventListener("scroll" , handleScroll)


}, [])
  const logout =  async()=>{
  const logout= await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
    method: "POST",
    credentials: "include"
  })

  if(logout.ok){
    toast.success("Logged out successfully!")
  }
  }


  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

   

  return (
    <nav  className={navbarClass}>
      <div  className="navbar-logo">
        <img onClick={()=>navigate("/")} src={logo} className={scrolled ? "darkLogo" : "logo"} alt="" />
      </div>

      <div className= {navbarLinkClass}>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/stays">Explore</Link>
      </div>

        <div className="navbar-right">
          {localStorage.getItem("accessToken") ? (
            <>
        <div className="desktop-user-icon">
        {user?.user?.name.charAt(0).toUpperCase()}
    </div>
            </>
          ): <>
        
          
        <Link className={navbarLinkClass} id="signin" to="/auth">
         <MdPerson/> 
        </Link>
          </>}

        <div className="profile-wrapper" ref={menuRef}>
          <button className="profile-pill" onClick={() => setOpen(!open)}>
            <HiOutlineMenu className="menu-icon" />
          </button>

          <div className={`dropdown ${open ? "show" : ""}`}>

<div className="mobile-user">
{localStorage.getItem("accessToken") ? (

  <>
<div className="info">

 <div className="mobile-user-icon">
       {user?.user?.name.charAt(0).toUpperCase()}
    </div>
  <div className="mobile-user-text">
       {user?.user?.name.toUpperCase()}
    </div>
  
</div>
  
  </>
):(
  <>

  </>
)}




      </div>


{localStorage.getItem("accessToken") ? (
  <>
 <Link 
           
              className="dropdown-item logout"
              onClick={logout}
            >
              <HiOutlineLogout />
              Logout
            </Link>

  </>
): (

  <>
  
    <Link
        to="/auth"
        className="mobile-login-btn"
        onClick={() => { setOpen(false) ; navigate("/auth")}}
        >
        Login / Sign up
    </Link>
  
  </>
)}


  <Link className="dropdown-item" to="/stays"><HiOutlineGlobeAlt />Explore</Link>
            
            <Link
              to="/wishlist"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              <HiOutlineHeart />
              Wishlist
            </Link>

            <Link
              to="/Bookings"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              <HiOutlineClipboardList />
              Your Bookings
            </Link>
            <Link
              to="/reservations"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              <HiOutlineClipboardList />
              Reservation
            </Link>

            <Link
              to="/dashboard"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              <HiOutlineHome />
              Dashboard
            </Link>

            <Link
              to="/Host"
              className="dropdown-item"
              onClick={() => setOpen(false)}
            >
              <HiOutlinePlusCircle />
              Add Property
            </Link>

            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
