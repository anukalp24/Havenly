
const stripe = require("../../config/Stripe")

const Payment = require("../../Models/Payment")
const Home  = require("../../Models/Home")


const webhook =  async (req , res) =>{
    try {
       
        const signature = req.["stripe-signature"]
        
        const event  = stripe.webhooks.constructEvent(req.body , signature , process.env.STRIPE_WEBHOOK_SECRET)
        // now event wil get all properties of req/body
        // If the signature is valid, constructEvent() returns the event object.
        
        if(event.type === "checkout.session.completed"){
            console.log("payment successfull")
            const session = event.data.object
            
                    const exist  = await Payment.findOne({
                    stripeSessionId: session.id
                    })
                    
                    if(exist){
                        return res.status(200)
                    }

                    
                                const userId = session.metadata.userId
                                const homeId = session.metadata.homeId
    
                const home = await Home.findById(homeId)
                const Paymentdocument = await Payment.create({
                stripeSessionId: session.id,
                paymentIntentId: session.payment_intent,
                home: homeId, 
                owner: home.owner,
                guest: userId,
                totalPrice: session.amount_total / 100,
     paymentStatus: session.payment_status,
             propertyName: home.propertyName,
             cityname: home.cityname,
             desc: home.desc,
             files: home.files,
             checkIn: session.metadata.checkIn,
             checkOut: session.metadata.checkOut
            })


    //        
         
            
// Now session is:
// {
//     id: "cs_test_123",

//     payment_status: "paid",

//     amount_total: 5000,

//     metadata: {
//         userId: "123",
//         homeId: "456"
//     }
// }


return res.status(200).json({
 received: true
})
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
}

module.exports = webhook




// function constructEvent(body, receivedSignature, secret) {

//     // THIS IS THE GENERATION
//     const generatedSignature = HMAC(body, secret);

//     // THIS IS THE COMPARISON
//     if (generatedSignature !== receivedSignature) {
//         throw new Error("Invalid Signature");
//     }

//     return body;
// }

// internally it does somehting like this


