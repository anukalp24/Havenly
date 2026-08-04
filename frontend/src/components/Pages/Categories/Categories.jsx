import React  from 'react'
import {  useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import Skeleton from '../../../Utils/Skeleton'
import "./Categories.css"

const Categories = () => {
  const Navigate = useNavigate()
  const [message, setmessage] = useState("")
  const [categoryResponse, setcategoryResponse] = useState(null)

 

useEffect(() => {
 const categoryfunc = async ()=>{
  const request = await fetch(`${import.meta.env.VITE_API_URL}/categories` , {
   headers :  {"Content-Type": "application/json"},
    method: 'POST',
    body: JSON.stringify({
      categories: localStorage.getItem("category")
    })
  })
  const result = await request.json()
setcategoryResponse(result.categories)
setmessage(result.message)
 }

 categoryfunc()
}, [])

  return (
    <>
<Navbar/>

{categoryResponse ? (
  <>

    <div className="category-page">
      <div className="category-header">
        <h1>Showing Results for {localStorage.getItem("category")} </h1>
        <p>{categoryResponse?.length === 1 ? "property" : "properties"}  found</p>
      </div>
        <div className="category-grid">
          {categoryResponse?.map((homes, index) => (
            <div key={index} className="category-card" onClick={() => Navigate(`/home/${homes._id}`)}>
              <img className="category-card-img" src={homes.files[0]} alt={homes.propertyName} />
              <div className="category-card-body">
                <h3 className="category-card-title">{homes.propertyName}</h3>
                <p className="category-card-location">📍 {homes.cityname} , {homes.country}</p>
                <p className="category-card-desc" style={{ fontSize: "0.85rem", color: "#717171", margin: "0 0 6px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{homes.desc}</p>
                <div className="category-card-divider" />
                <div className="category-card-footer">
                  <span className="category-card-price">₹{homes.price}<span> / night</span></span>
                  <span className="category-card-rating"><span className="star">★</span> {homes.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
          </>
        ) : (
        <>
 <>
  <div className="category-page">
    <div className="category-header">
      <h1>Showing Results for {localStorage.getItem("category")}</h1>
      <p>Loading properties...</p>
    </div>

    <div className="category-grid">
      {[...Array(3)].map((_, index) => (
        <div className="property-skeleton" key={index}>
          <div className="skeleton-image"></div>

          <div className="skeleton-body">
            <div className="skeleton-title"></div>

            <div className="skeleton-location"></div>

            <div className="skeleton-desc short"></div>
            <div className="skeleton-desc"></div>

            <div className="skeleton-footer">
              <div className="skeleton-price"></div>
              <div className="skeleton-heart"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</>
        </>
        )}
    <Footer/>

    </>
  )
}

export default Categories