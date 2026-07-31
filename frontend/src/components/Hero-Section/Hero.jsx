import "./Hero.css";
import { useContext , useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { info } from "..";

import hero2 from "../../assets/photos/hero.png"


import { HiOutlineSearch } from "react-icons/hi";
const Hero = () => {


  const navigate = useNavigate();
  const { search, setsearch } = useContext(info);
  const HandleAdd = () => {
    if (!search.trim()) return;
    localStorage.setItem("search", search);
    setsearch("")
    navigate("/search");
  };




  return (

  <section className="hero">

    <img
      src={hero2}
      alt=""
      className="hero-image"
    />

    <div className="hero-left">
      <h1>Find Your Perfect Escape</h1>
      <p>Luxury stays for unforgettable gateways.</p>
    </div>
    <div className="hero-search">
      <input
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        placeholder="Search city or by category..."
      />
      <HiOutlineSearch
        className="search-icon"
        onClick={HandleAdd}
      />
    </div>

  </section>

  );
};

export default Hero;