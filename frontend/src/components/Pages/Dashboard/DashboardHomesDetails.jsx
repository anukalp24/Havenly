import React from "react";
import { useParams } from "react-router-dom";
import "../HomeDetails/HomeDetails"
import { useEffect, useState, useContext } from "react";
import { info } from "../..";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import "./DashboardHomesDetails.css";
import fetchWithRefresh from "../../../Utils/fetchWithRefresh";
const DashboardHomesDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [dashboardHomeDetails, setdashboardHomeDetails] = useState();
  const { setform, setresponse, response, setdashboard, dashboard } =
    useContext(info);


  const handleshare = async () => {
    try {
      await navigator.share({
        title: "UrbanStay",
        text: "Check out this amazing property!",
        url: window.location.href,
      });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
  
    async function dashbaordDetails() {
      const req = await   fetchWithRefresh(`http://localhost:4090/dashboardHomeDetails/${_id}` , {
headers: {
  authorization: localStorage.getItem("accessToken"),
  credentials: "include"
}
      }) 
       
      
      const result = await req.json();
      setdashboardHomeDetails(result);
    }



    dashbaordDetails();
  }, []);

  const HandleDelete = async (id) => {
    let api = await  fetchWithRefresh(`http://localhost:4090/deletehome/${id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
      credentials: "include"
    });


    if (api.ok) {
      const newitem = dashboard.filter((val) => {
        return val._id !== id;
      });
      setdashboard(newitem);
      setdashboardHomeDetails(null);

      const newResponse = response.filter((val) => val._id !== id);
      setresponse(newResponse);
    }
  };

  const HandleEdit = (home) => {
    setform(home);
    const newItem = dashboard.filter((val) => {
      return val._id !== home._id;
    });
    // filter removes
    setdashboard(newItem);
    navigate("/Host");
  };

  return (
    <>
      <Navbar />
      {dashboardHomeDetails ? (
       <div onClick={()=> navigate("booking-details")} className="hd-wrapper">
       
         <div className="hd-gallery-wrapper">
       
           <div className="hd-gallery">
       
             <div className="hd-gallery-left">
               <img
                 src={dashboardHomeDetails?.home?.files?.[0]}
                 alt=""
               />
             </div>
       
             <div className="hd-gallery-right">
       
               <img
                 src={dashboardHomeDetails?.home?.files?.[1] || dashboardHomeDetails?.home?.files?.[0]}
                 alt=""
               />
       
               <img
                 src={dashboardHomeDetails?.home?.files?.[2] || dashboardHomeDetails?.home?.files?.[0]}
                 alt=""
               />
       
             </div>
       
           </div>
       
           <div className="hd-gallery-actions">
       
             <button
               className="gallery-icon"
               onClick={handleshare}
             >
       
               <svg viewBox="0 0 50 50" fill="currentColor">
                 <path d="M38.288 10.297l1.414 1.415-14.99 14.99-1.414-1.414z"/>
                 <path d="M40 20h-2v-8h-8v-2h10z"/>
                 <path d="M35 38H15c-1.7 0-3-1.3-3-3V15c0-1.7 1.3-3 3-3h11v2H15c-.6 0-1 .4-1 1v20c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V24h2v11c0 1.7-1.3 3-3 3z"/>
               </svg>
       
             </button>
       <div className="gallery-swipe-hint">
       
         <svg viewBox="0 0 24 24" fill="none">
           <path
             d="M9 6l6 6-6 6"
             stroke="currentColor"
             strokeWidth="2.5"
             strokeLinecap="round"
             strokeLinejoin="round"
           />
         </svg>
       </div>
           </div>
       
         </div>
       
         
       <div className="hd-content">
       
         {/* LEFT */}
       
         <div className="hd-left">
       
           <h1 className="hd-title">
             {dashboardHomeDetails?.home?.propertyName}
           </h1>
       
           <p className="hd-location">
             📍 {dashboardHomeDetails?.home?.cityname}
           </p>
       
       
         
       
           
           <div className="hd-about">
       
             <h2>About this Place</h2>
       
             <p>
               {dashboardHomeDetails?.home?.desc}
             </p>
       
           </div>
       
         </div>
       
       
       
         {/* RIGHT */}
       <div className="hd-sidebar">
       
         <div className="booking-card">
       
           <div className="booking-price">
       
             <h2>₹{dashboardHomeDetails?.home?.price}</h2>
       
             <span>/ Night</span>
       
           </div>
       
           <div className="booking-grid">
       
       
       
           </div>
       
       
           {/* <p className="booking-msg">{message}</p> */}
       
           <div className="price-breakdown">
       
            
             <div className="price-row">
               <span>Cleaning Fee</span>
               <span>₹500</span>
             </div>
       
             <div className="price-row">
               <span>Service Fee</span>
               <span>₹300</span>
             </div>
       
             <hr />
       
             <div className="price-total">
               <strong>Total</strong>
       
               <strong>
                 ₹{Number(dashboardHomeDetails?.home?.price|| 0) + 800}
               </strong>
             </div>
           <button
             className="book-btn"
             onClick={() => HandleDelete(dashboardHomeDetails?.home?._id)}
           >
             Delete
           </button>
           <button
             className="book-btn"
             onClick={() => HandleEdit(dashboardHomeDetails?.home)}
           >
             Edit
           </button>
       
           </div>
       
         </div>
       
       </div>
       </div> 
       
       </div> 


      ) : (
     <div className="dashboardhomesdetails-empty">
  <div className="dashboardhomesdetails-empty-card">
    <div className="dashboardhomesdetails-empty-icon">🏠</div>

    <h2>Property Not Found</h2>

    <p>
      This property may have been deleted or is no longer available.
    </p>

    <button
      className="dashboardhomesdetails-back-btn"
      onClick={() => navigate("/dashboard")}
    >
      Back to Dashboard
    </button>
  </div>
</div>
      )}

      <Footer />
    </>
  );
};

export default DashboardHomesDetails;
