import React from 'react'
import { info } from '../..'
import { useState , useContext , useEffect } from 'react'
import './Wishlist.css'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import fetchWithRefresh from '../../../Utils/fetchWithRefresh'
const Wishlist = () => {
    const {wishlist , setwishlist , handleStay} = useContext(info)
    const [removeLoader, setremoveLoader] = useState(false)
const [loader, setloader] = useState(true)
useEffect(() => {
const wishlist = async ()=>{

  const wishlist  = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/wishlist` , {
method: "GET",
      headers: {
        authorization: localStorage.getItem("accessToken")
      },
        credentials: "include"
  })
   
    const response2 = await wishlist.json()
    setwishlist(response2)
    setloader(false)
  }
  wishlist()
}, [])

    const handleremove = async (id) => {
      setremoveLoader(true)
      let remove = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/Removewishlist/${id}`, {
        headers:{
           authorization: localStorage.getItem("accessToken")
        } ,
        method: "DELETE",
        credentials: "include"
      })

      if (!remove.ok) {
        return setloader(false)
      }

      const newitem = wishlist.wishlist.filter(val => val._id !== id)
      setwishlist({
        ...wishlist , wishlist: newitem
      })
      setremoveLoader(false)
    }
      
    return (
 <>
    <>
  {loader === true ? (
    <div className="loader-parent">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="wishlist-parent">
      <Navbar />

      <div className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>{wishlist.wishlist.length} saved {wishlist.wishlist.length === 1 ? 'property' : 'properties'}</p>
      </div>

      {wishlist?.wishlist?.length === 0 ? (
        <div className="wishlist-empty">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <h2>No saved properties yet</h2>
          <p>Start exploring and save your favorite places to stay</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist?.wishlist?.map((val) => (
            <div   onClick={()=>handleStay(val.home._id)}   key={val._id} className="card-boxes">

              <img
                className="card-img"
                src={val?.home?.files[0]}
                alt={val?.home?.propertyName}
              />

              <div className="card-body"> 

                <div className="sec-1">
                  <h3 className="card-title">{val?.home?.propertyName}</h3>
                  <span className="card-rating">⭐ {val?.home?.rating}</span>
                </div>

                <p className="card-location">📍 {val?.home?.cityname}</p>

                <p className="card-desc">{val?.home?.desc}</p>

                <div className="card-divider"></div>

                <div className="sec-2">
                  <span className="card-price">₹{Number(val?.home?.price).toLocaleString("en-IN")}/night</span>
              
               <button
  
  className="wishlist-button"
  onClick={(e) => {
    e.stopPropagation();
    handleremove(val._id);
  }}
>

  {removeLoader === val._id ? (
    <>
    <div className="loader-2"></div>
    </>
  ) : (

    <>
    Remove
    </>
  )}
</button> 



                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )}
</>
          <Footer/>
        </>
    )
}

export default Wishlist
