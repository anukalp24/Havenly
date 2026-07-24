const express = require("express")
const authMiddleware = require("../Middleware/authMiddleware")
const createCheckoutSession = require("../Controllers/Payment/createCheckoutSession")
const reservationsController = require("../Controllers/Payment/Reservations")
const reservationDetails = require("../Controllers/Payment/ReservationDetails")
const cancelReservationController = require("../Controllers/Payment/CancelReservation")

const bookingDetail = require("../Controllers/Payment/BookingDetails")

const bookingController = require("../Controllers/Payment/BookingsController")
const cancelBooking = require("../Controllers/Payment/CancelBooking")


const Router = express.Router()

Router.get("/bookings" , authMiddleware ,   bookingController)
Router.put("/cancel-booking/:id" , authMiddleware , cancelBooking )
Router.post("/create-checkout-session/:id" , authMiddleware , createCheckoutSession )
Router.get("/reservations" , authMiddleware ,  reservationsController ) 
Router.get("/reservationDetails/:id" , authMiddleware , reservationDetails  ) 
Router.put("/cancel-reservations/:id" , authMiddleware , cancelReservationController) 
Router.get("/bookingDetails/:id" , authMiddleware , bookingDetail )


module.exports = Router