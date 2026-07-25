const Payment = require("../../Models/Payment")
const stripe = require("../../config/Stripe")

const payment = async (req , res)=>{
    try {
console.log("hitted yessss")
        const paymentDocument = await Payment.findOne({
            _id: req.params.id,
            guest: req.user.id
        })



        if(!paymentDocument){
            return res.status(404).json({
                message: "Booking not found or not authorized"
            })
        }

        if(paymentDocument.status === "cancelled"){
          return  res.status(400).json({
                message: "Booking already cancelled"
            })
        }




await stripe.refunds.create({
    payment_intent: paymentDocument.paymentIntentId
})

paymentDocument.paymentStatus = "refunded"
paymentDocument.status = "cancelled"
paymentDocument.guestMessage = "You have successfully cancelled this booking."
paymentDocument.ownerMessage = "Your reservation has been cancelled by the user."

await paymentDocument.save()

        
        return res.status(200).json({
            home: paymentDocument,
            message: "Booking cancelled successfully"
        }
        )
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal sever error"
        })
    }
}

module.exports = payment