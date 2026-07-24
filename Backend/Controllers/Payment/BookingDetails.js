const Payment = require("../../Models/Payment")


const booking = async(req , res)=>{
    try {
        console.log("hitted just now baby")
        const bookingDetail = await Payment.findOne({
            _id: req.params.id,
            guest: req.user.id
        }).populate("owner")

console.log(bookingDetail)


        if(!bookingDetail){
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        console.log("home sent sccessfully")
return res.status(200).json({
    home: bookingDetail,
})




    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


module.exports = booking
