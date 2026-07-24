const Payment = require("../../Models/Payment")


const payment = async (req , res)=>{
    try {

   
       
        const cancelBooking = await Payment.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        })

        if(!cancelBooking){
            return res.status(404).json({
                message: "Booking not found or not authorized"
            })
        }



        return res.status(200).json({
            message: "Booking deleted successfully"
        }
        )

        
    } catch (error) {
        return res.status(500).json({
            message: "Internal sever error"
        })
    }
}

module.exports = payment