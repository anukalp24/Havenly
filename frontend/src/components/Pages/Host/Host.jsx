import React from 'react'
import "./Host.css"
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import { useState , useContext  ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { info } from '../..'
import fetchWithRefresh from '../../../Utils/fetchWithRefresh'
const Host = () => {
  const [files, setfiles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
   const token = localStorage.getItem("accessToken")
   
   if(!token){
    navigate("/auth")
   }
  }, [])
  
const [error, seterror] = useState("")

  const {response , setresponse , form , setform} = useContext(info)
  const handleImage = (e)=>{
    setfiles(e.target.files)
  }

const handlechange = (e)=>{

    setform({...form ,[e.target.name] : e.target.value})
    seterror({
      ...error , [e.target.name] : ""
    })
}

const handleadd =  async (e)=>{
    e.preventDefault()

    const newErrors = {}
    if(form.propertyName  === ""){
      newErrors.propertyName = "Property name field is required" 
    }

    if(form.category === ""){
      newErrors.category = "Category field is required"
    }
      if( form.cityname === ""){
   newErrors.cityname = "City name is required" 
      } 
      if( form.country === ""){
   newErrors.country = "City name is required" 
      } 
      
    if(form.price  === ""){
         newErrors.price = "Price field is required" 
    }
    
    
    
  //   if(files.length < 3){
  //  newErrors.url =   "Please upload at least 3 images"

  //   }
    
    if(form.desc === "" ){
       newErrors.desc = "Description is required" 

    }
    seterror(newErrors)

  if(Object.keys(newErrors).length > 0){
    return
  }
if(form._id){
 const formData = new FormData()   // creates an empty container lika a bag 
formData.append("files", files[0]);
formData.append("files", files[1]);
formData.append("files", files[2]);


  formData.append("propertyName" , form.propertyName)
formData.append("category" ,form.category )

formData.append(
  "cityname",
  form.cityname
)
formData.append(
  "country",
  form.country
)

formData.append(
  "price",
  form.price
)



formData.append(
  "desc",
  form.desc
)





  let updateRequest = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/edithome/${form._id}`,{
    method: "PUT",
    headers: {
    authorization: localStorage.getItem("accessToken")
},
credentials: "include",
         body: formData
        })
          navigate("/")
        

}
else{
  const formData = new FormData()   // creates an empty container lika a bag 
formData.append("files", files[0]);
formData.append("files", files[1]);
formData.append("files", files[2]);

  formData.append("propertyName" , form.propertyName)
formData.append("category" ,form.category )

formData.append(
  "cityname",
  form.cityname
)
formData.append(
  "country",
  form.country
)

formData.append(
  "price",
  form.price
)


formData.append(
  "desc",
  form.desc
)

  let request2 = await fetchWithRefresh("${import.meta.env.VITE_API_URL}/addhome" , {
    method: "post",
    headers: {
      authorization: localStorage.getItem("accessToken")
    },
    credentials: "include",
    body: formData
  })
}
setform({
   propertyName:"",
   category: "",
   cityname:"",
   country: "",
   price:"",
   desc:"",
})
navigate("/")

}


  return (
    <>
<Navbar/> 
    <div className="host-page">
    <div className="host-container">
     <div className="heading-section">
        <h2>Become a <span>Host</span></h2>
        <p>List your property and earn money.</p>
     </div>
   <form className="host-form">
    <div className="form-grid">
     <div className="form-group">
      <label className="form-label">Property Name</label>
      <input value={form.propertyName} name='propertyName'   onChange={handlechange}  placeholder='e.g. Luxury Beach Villa' id='property-name' type="text" />
      {error.propertyName && <p className="field-error">{error.propertyName}</p> }
     </div>

     <div className="form-group">
      <label className="form-label">Category</label>
      <input  placeholder='e.g. Villa, Cabin, Apartment'  onChange={handlechange}  value={form.category} name='category' type="text" />
      {error.category && <p className="field-error">{error.category}</p>  }
     </div>

     <div className="form-group">
      <label className="form-label">City</label>
      <input value={form.cityname} name='cityname'   onChange={handlechange}  placeholder='e.g. Shimla' id='city-name' type="text" />
      {error.cityname && <p className="field-error">{error.cityname}</p> }
     </div>

     <div className="form-group">
      <label className="form-label">Country</label>
      <input value={form.country} name='country'   onChange={handlechange}  placeholder='e.g. India' id='country' type="text" />
      {error.country && <p className="field-error">{error.country}</p> }
     </div>

     <div className="form-group">
      <label className="form-label">Price Per Night</label>
      <input value={form.price} name='price'  onChange={handlechange}  placeholder='e.g. ₹5000' id='price' type="number" />
      {error.price && <p className="field-error">{error.price}</p> }
     </div>

    

     <div className="form-group">
      <label className="form-label">Property Image</label>
      <div className="file-input-wrapper">
       <input onChange={handleImage} name='photo' accept="image/*" id='img-url' type="file" multiple />
       <span className="file-btn">Choose Files</span>
      </div>
      {error.url && <p className="field-error">{error.url}</p> }
     </div>
      {error.url && <p className="field-error">{error.url}</p> }
     </div>

    <div className="form-group full-width">
     <label className="form-label">Description</label>
     <textarea value={form.desc} name='desc'  onChange={handlechange}  placeholder='Describe your property — what makes it special?' id='description'></textarea>
     {error.desc && <p className="field-error">{error.desc}</p> }
    </div>

    <div className="form-actions">
     <button onClick={handleadd} type='submit' id='host-submit'>Add Property</button>
    </div>

</form>
    </div>
    <div className="host-illustration">
      <div className="ill-badge">
        <span className="ill-badge-icon">$</span>
        <div>
          <p className="ill-badge-title">Earn up to</p>
          <p className="ill-badge-amount">₹75,000</p>
          <p className="ill-badge-sub">per month</p>
        </div>
      </div>
      <div className="ill-features">
        <div className="ill-feature">
          <div className="ill-feature-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div>
            <p className="ill-feature-title">List your space</p>
            <p className="ill-feature-desc">In just 10 minutes</p>
          </div>
        </div>
        <div className="ill-feature">
          <div className="ill-feature-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
          </div>
          <div>
            <p className="ill-feature-title">Set your price</p>
            <p className="ill-feature-desc">You're in control</p>
          </div>
        </div>
        <div className="ill-feature">
          <div className="ill-feature-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <p className="ill-feature-title">Stay protected</p>
            <p className="ill-feature-desc">Host guarantee included</p>
          </div>
        </div>
      </div>
      <div className="ill-glow ill-glow-1"></div>
      <div className="ill-glow ill-glow-2"></div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Host