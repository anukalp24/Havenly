const Home = require("../../Models/Home")
const Payment = require("../../Models/Payment")
const stripe = require("../../config/Stripe")
const { checkout } = require("../../routes/webhook")

const createCheckoutSession =  async (req, res)=>{
    try {
      const {checkIn , checkOut} = req.body
        const home = await Home.findById(req.params.id)
        


        if(!home){
            return res.status(404).json({
                message: "Home not found"
            })
        }
        


        const existingBooking = await Payment.findOne({
        home: req.params.id, 
        checkIn: {
            $lte: checkOut
        } ,

        checkOut: {
            $gte: checkIn
        }


    })

    if(existingBooking.owner)
    if(existingBooking){
        console.log("this propety is nto avaibalbe in these dates")
        return res.status(409).json({
            message: "This property is unavailable for the selected dates."
        })
    }

   

        const session = await stripe.checkout.sessions.create({

            metadata: {
                userId: req.user.id,
                homeId: home._id.toString(),
                checkIn: checkIn,
                checkOut: checkOut
            } ,
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data:{
                            name: home.propertyName 
                        } ,
                        unit_amount: home.price *100
                    } ,

                    quantity: 1
                }
            ] ,

            mode: "payment",
            success_url: "http://localhost:5173/payment-success" ,
            cancel_url: "http://localhost:5173/payment-cancel"
        })
                           
     

// stripe stores this obj CheckoutSession = {

//     id: "cs_test_123",

//     payment_status: "unpaid",

//     amount_total: 500000,

//     metadata: {
//         userId: "123",
//         homeId: "456",
//         checkIn: "2026-07-20",
//         checkOut: "2026-07-25"
//     },

//     success_url: "...",

//     cancel_url: "..."
// }















        return res.status(200).json({
              url: session.url
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = createCheckoutSession