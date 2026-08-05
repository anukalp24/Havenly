import './App.css'
import {Routes , Route} from "react-router-dom"
import About from '../Pages/FooterPages/About/About'
import Contact from '../Pages/Contact/Contact'
import Home from '../Pages/Home/Home'
import Host from '../Pages/Host/Host'
import Dashboard from '../Pages/Dashboard/DashboardHomes'
import DashboardDetails from "../Pages/Dashboard/DashboardHomesDetails"
import { useState , useEffect } from 'react'
import Wishlist from '../Pages/Wishlist/Wishlist'
import Login from '../Pages/Auth/Login'
import ForgotPassword from '../Pages/ForgetPassword/ForgotPassword'
import ResetPassword from '../Pages/ForgetPassword/ResetPassword'
import HomeDetails from '../Pages/HomeDetails/HomeDetails'
import Search from '../Pages/Search/Search'
import Stays from "../Pages/Stays/Stays"
import Categories from '../Pages/Categories/Categories'
import EmailVerification from '../Pages/Auth/Email-Verification'
import PaymentSuccess from '../Pages/Payment/PaymentSuccess'
import PaymentFailed from '../Pages/Payment/PaymentFailed'
import Bookings from '../Pages/Bookings/Bookings'
import SecurityPrivacy from '../Pages/FooterPages/security/Security'
import Reservation from '../Pages/Reservation/Reservation'
import ReservationDetails from '../Pages/Reservation/ReservationDetails'
import BookingDetails from '../Pages/Bookings/BookingDetails'
import NotFound from '../Pages/404/NotFound'
import { useNavigate } from 'react-router-dom'
import Terms from '../Pages/FooterPages/termsCondition/Terms'
import fetchWithRefresh from '../../Utils/fetchWithRefresh'
import ScrollToTop from '../ScrollToTop'
import Faq from '../Pages/FooterPages/Faq/Faq'
import toast from 'react-hot-toast'
import { info } from '..'
function App() {
  const navigate = useNavigate()

const [response, setresponse] = useState([])
const [wishlist, setwishlist] = useState([])
const [search, setsearch] = useState("")
const [searchResult, setsearchResult] = useState(null)


const [form, setform] = useState({
propertyName: "",
category: "",
country: "",
cityname: "",
price:"",
desc: "",
})
const [dashboard, setdashboard] = useState([]) 
const handlewishlist  = async (id)=>{
let accessToken = localStorage.getItem("accessToken")
if(!accessToken){
  navigate("/auth")
  return
}

let WishlistRequest =   await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/wishlist/${id}` , {
    method: "PUT",
         credentials: "include"
  })
  if(!WishlistRequest.ok){
        return
      }

toast.success("Added to wishlist")

}
const handleStay = (id)=>{
  navigate(`/home/${id}`)
}
  return (
    <>
  <info.Provider value={{response , setresponse , form , setform , wishlist , setwishlist , search , setsearch , searchResult, setsearchResult , handleStay , dashboard , setdashboard , handlewishlist}}>
    <ScrollToTop/>
<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/About' element={<About/>}></Route>
<Route path='/Contact' element={<Contact/>}></Route>
<Route path='/Host' element={<Host/>}></Route>
<Route path='/Wishlist' element={<Wishlist/>}></Route>
<Route path="/dashboard" element={<Dashboard/>}></Route>
<Route path="/auth" element={<Login/>}></Route>
<Route path='/forgot-password' element={<ForgotPassword />}></Route>
<Route path='/reset-password/:token' element={< ResetPassword/>}></Route>
<Route  path='/home/:id' element={<HomeDetails/>} ></Route>
<Route path='/search' element={<Search/>} ></Route>
<Route path='/stays' element={<Stays/>} ></Route>
<Route path='/categories' element={<Categories/>} ></Route>
<Route path='/dashboardHomeDetails/:_id' element={<DashboardDetails/>}></Route>
<Route path='/email-verification' element={<EmailVerification/>}></Route>
<Route path='/payment-success' element={<PaymentSuccess/>}></Route>
<Route path='/payment-cancel' element={<PaymentFailed/>}></Route>
<Route path='/Bookings'  element={<Bookings/>}></Route>
<Route path='/bookingDetails/:_id'  element={<BookingDetails/>}></Route>
<Route path='/security-policy'  element={<SecurityPrivacy/>}></Route>
<Route path='/terms-and-conditions'  element={< Terms/>}></Route>
<Route path='/reservations'  element={<Reservation/>}></Route>
<Route path='/reservationDetails/:_id'  element={<ReservationDetails/>}></Route>
<Route path='/faq'  element={<Faq/>}></Route>
<Route path='*'  element={<NotFound/>}></Route> 
</Routes>
  </info.Provider>
    </>
  )
}
export default App
