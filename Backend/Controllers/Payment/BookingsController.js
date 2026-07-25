const Payment = require("../../Models/Payment")
const mongoose = require("mongoose");

const getBookings  =  async (req , res)=>{
    try {
        console.log("oh yeahh")
     const bookedHomes = await Payment.find({
        guest: req.user.id               
     })

     if(bookedHomes.length === 0){

    return res.status(404).json({
        message: "No bookings found"
    })
     }


return res.status(200).json(bookedHomes)



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal sever error"
        })
    }
}
module.exports = getBookings