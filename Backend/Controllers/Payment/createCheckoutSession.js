const Home = require("../../Models/Home")
const Payment = require("../../Models/Payment")
const stripe = require("../../config/Stripe")


const createCheckoutSession =  async (req, res)=>{
    try {
      const {checkIn , checkOut} = req.body
        const home = await Home.findById(req.params.id)
        

const checkInDate = new Date(checkIn)
const checkOutDate = new Date(checkOut)


if(checkInDate >= checkOutDate){
    return res.status(400).json({
        message: "Check-out must be after check-in"
    })
}
        if(!home){
            return res.status(404).json({
                message: "Home not found"
            })
        }
        
        if(home.owner.toString() === req.user.id){
            return res.status(400).json({
                message: "You cannot book your own property. "
            })

        }

        const existingBooking = await Payment.findOne({
        home: req.params.id, 
        status: "confirmed",
        checkIn: {
            $lte: checkOutDate
        } ,

        checkOut: {
            $gte: checkInDate
        }
    })     

    if(existingBooking){
        return res.status(409).json({
            message: "This property is unavailable for the selected dates."
        })
    }


   const nights = Math.ceil( (checkOutDate-checkInDate)   /  (1000 *60 * 60 *24)   )
   
   // stripe metadata olny accepts string
const total = home.price * nights + 800
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
                        unit_amount: total * 100
                    } ,

                    quantity: 1
                }
            ] ,

            mode: "payment",
        success_url: "https://havenlyy.vercel.app/payment-success",
cancel_url: "https://havenlyy.vercel.app/payment-cancel"
        })
                           
     

// stripe stores this obj CheckoutSession = {

//     id: "cs_test_123",

//     payment_status: "unpaid",

//     amount_total: 500000,

//     metadata: {
//         userId: "123",
//         homeId: "456",bn  
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
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = createCheckoutSession