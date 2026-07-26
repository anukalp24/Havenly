import React from 'react'
import "./Stays.css"
import { useState , useEffect , useContext } from 'react'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { info } from '../..'
import Navbar from 'components/Navbar/Navbar'
import Footer from 'components/Footer/Footer'
import { useNavigate } from 'react-router-dom';
import {
  FaHeart,
  FaMapMarkerAlt,

} from "react-icons/fa";

import {
  MdSearch,
  MdKeyboardArrowDown,
} from "react-icons/md";



const Card = () => {

  const navigate = useNavigate()
  const { handleStay , handlewishlist} = useContext(info)
const [price, setprice] = useState([0 , 100000]) // slider state

const [page, setPage] = useState(1)
const [allHomes, setallHomes] = useState([])
const [search, setsearch] = useState("")

const handleClick  = ()=>{
  if(search === ""){
    return
  }
   localStorage.setItem("search" ,search );
     navigate("/search") 
}



useEffect(() => {
const FetchHomes = async ()=>{
    const api =   await fetch(`http://localhost:4090/?page=${page}&minPrice=${price[0]}&maxPrice=${price[1]}`)
    const result  = await api.json()
    setallHomes(result)
}
FetchHomes()
}, [page])




const handleFilter =  async ()=>{
 const api =   await fetch(`http://localhost:4090/?page=${page}&minPrice=${price[0]}&maxPrice=${price[1]}`)
    const result  = await api.json()
    setallHomes(result)
}


  return (
    <>
<Navbar/>


<div className="stays-page">

  {/* Search */}

  <div className="search-bar">

    <input value={search} onChange={(e)=>setsearch(e.target.value)}
      type="text"
      placeholder="Search destinations, villas..."
    />
    <button onClick={handleClick} className="search-btn">
      <MdSearch />
    </button>

  </div>



  <div className="content-wrapper">

    {/* LEFT */}

    <aside className="filters">

      <div className="filter-section">

        <h4>Price Range</h4>

  <Slider
  range
  min={0}
  max={100000}
  value={price}
  onChange={setprice}
/>
<div className="price-range-box">
  <div className="price-inputs">
    <div className="price-input">
      ₹ {price[0]}
    </div>

    <div className="price-input">
      ₹ {price[1]}
    </div>
  </div>

  <button onClick={()=> {handleFilter() ; setPage(1) }} className="apply-btn">
    Apply
  </button>
</div>


      </div>

    </aside>




    {/* RIGHT */}
    <section className="properties-section">

      <div className="section-top">

        <h2>Luxury Stays</h2>

    

      </div>



    

{allHomes.map((home , index)=>(
      <div onClick={()=>handleStay(home._id)} className="property-card">

<>
  <div className="property-image">

          <img src={home.files[0]} alt="" />

          <button className="wishlist-btn">
            <FaHeart />
          </button>
        </div>


        <div className="property-content">

          <div className="property-header">

            <div>

              <h2>{home.propertyName}</h2>
              <p>
                <FaMapMarkerAlt />
                {home.cityname} , {home.country}
              </p>
            </div>
          </div>
          <p className="property-description">{home.desc}</p>

        </div>
        <div className="price-section">

          <span className="starting">
            Starting From
          </span>

          <h2>₹{home.price}</h2>
          <p>/ Night</p>

<div className="button-parent">

          <button className='stay-btn'>
            View Property
          </button>
          <button onClick={(e)=> {e.stopPropagation() ; handlewishlist(home._id)}}  className='stay-btn' id='wishlist-btn'>
           Add to Wishlist
          </button>
</div>

        </div>
</>

      </div>
))}



      {/* PAGINATION */}

      <div className="pagination">

        <button  onClick={()=>setPage(1)} >{"<"}</button>

        <button className={page === 1 ? "active" : ""} onClick={()=>setPage(1)}>1</button>

        <button className={page === 2 ? "active" : ""}   onClick={()=>setPage(2)}>2</button>

       <button  onClick={()=>setPage(2)} >{">"}</button>

      </div>

    </section>

  </div>

</div>




<Footer/>

  </>        
  )
  }
export default Card