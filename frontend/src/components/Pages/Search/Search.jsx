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
    <Navbar />

    {loader ? (
      <>
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      </>
    ) : (
      <div className="search-results-page">
        <div className="search-results-header">
          <h1>Properties in {localStorage.getItem("search")}</h1>
          <p>{searchResult?.home?.length} properties found</p>
        </div>

        {searchResult?.home?.length > 0 ? (
          <div className="search-results-grid">
            {searchResult.home.map((homes, index) => (
              <div
                key={index}
                className="search-results-card"
                onClick={() => navigate(`/home/${homes._id}`)}
              >
                <img
                  className="search-results-card-img"
                  src={homes.files[0]}
                  alt={homes.propertyName}
                />

                <div className="search-results-card-body">
                  <h3 className="search-results-card-title">
                    {homes.propertyName}
                  </h3>

                  <p className="search-results-card-location">
                    📍 {homes.cityname} , {homes.country}
                  </p>

                  <p
                    className="search-results-card-desc"
                    style={{
                      fontSize: "0.85rem",
                      color: "#717171",
                      margin: "0 0 6px",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {homes.desc}
                  </p>

                  <div className="search-results-card-divider" />

                  <div className="search-results-card-footer">
                    <span className="search-results-card-price">
                      ₹{Number(homes.price).toLocaleString("en-IN")}
                      <span> / night</span>
                    </span>

                    <span className="search-results-card-rating">
                      <span className="star">★</span> {homes.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="search-results-empty">
            <div className="search-results-empty-icon">🔍</div>
            <h2>No properties found</h2>
            <p>Try searching for a different city or destination.</p>
          </div>
        )}
      </div>
    )}

    <Footer />
  </>
  )
}

export default Search
