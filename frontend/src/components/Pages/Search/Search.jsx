import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { info } from '../..'
import { useNavigate } from 'react-router-dom'
import "./Search.css"
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
const Search = () => {
  const {  searchResult , setsearchResult  } = useContext(info)
const [loader, setloader] = useState(true)
   const navigate = useNavigate()
  
  useEffect(() => {
  async function  searchfunc (){
setloader(true)
    const request = await fetch(`${import.meta.env.VITE_API_URL}/search` , {
      headers:  {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({search: localStorage.getItem("search")})


    })

    const response = await request.json()
    setsearchResult(response)
    setloader(false)
   }

   searchfunc()
}, [])



 

  return (
    <>
      <Navbar/>

      {loader ? (
        <>
<div className="loader-parent">
  <div className="loader"></div>
</div>
        </>
      ): (        
        <div className="search-page">
      <div className="search-header">
        <h1>Properties in {localStorage.getItem("search")}</h1>
        <p>{searchResult?.home?.length} properties found</p>
      </div>

      {searchResult?.home?.length > 0 ? (
        <div className="search-grid">
          {searchResult.home.map((homes, index) => (
            <div key={index} className="search-card" onClick={() => navigate(`/home/${homes._id}`)}>
              <img className="search-card-img" src={homes.files[0]} alt={homes.propertyName} />
              <div className="search-card-body">
                <h3 className="search-card-title">{homes.propertyName}</h3>
                <p className="search-card-location">📍 {homes.cityname} , {homes.country}</p>
                <p className="search-card-desc" style={{ fontSize: "0.85rem", color: "#717171", margin: "0 0 6px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{homes.desc}</p>
                <div className="search-card-divider" />
                <div className="search-card-footer">
                  <span className="search-card-price">₹{Number(homes.price).toLocaleString("en-IN")}<span> / night</span></span>
                  <span className="search-card-rating"><span className="star">★</span> {homes.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="search-empty">
          <div className="search-empty-icon">🔍</div>
          <h2>No properties found</h2>
          <p>Try searching for a different city or destination.</p>
        </div>
      )}
    </div>
        )}
    <Footer/>
          </>
  )
}

export default Search
