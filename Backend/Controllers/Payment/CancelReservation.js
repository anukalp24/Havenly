const Payment = require("../../Models/Payment")

const stripe = require("../../config/Stripe")


const reservation = async(req , res)=>{
 try {
    console.log("hitted")
         const PaymentDocument = await Payment.findOne({
            _id: req.params.id,
            owner: req.user.id,
         } 
         )

             console.log("hitted2")
         
         if(!PaymentDocument){
             console.log("not found")
             return res.status(404).json({
                 message: "Reservation not found"
                })
            }




            if(PaymentDocument.paymentStatus === "refunded"){
                return res.status(400).json({
                    message: "You have already canceled this booking"
                })
            }
        


        await stripe.refunds.create({
            payment_intent: PaymentDocument.paymentIntentId
        })
        

        PaymentDocument.paymentStatus = "refunded"
        await PaymentDocument.save()
        


        
       return res.status(200).json({
    message: "Refund initiated successfully",
});
        
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = reservation