const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({

    
    status:{
        type: String,
        required: true,
        default: "confirmed"
    } ,


    guestMessage:{
        type: String,
        default: ""
    },
    
    ownerMessage:{
        type: String,
        default: ""
    } ,
    
    
    owner: {
        required: true,
        type:  mongoose.Schema.Types.ObjectId,
         ref: "User"
    }, 

guest:{
  required: true,
       type:  mongoose.Schema.Types.ObjectId,
       ref: "User"
}
,

home: {
     type: mongoose.Schema.Types.ObjectId,
    required: true
} ,

checkIn:{
     type: Date,
     required: true
},

checkOut:{
    type:  Date,
    required: true
}  , 

totalPrice: {
    required: true,
    type: Number
}
,

paymentStatus: {
    required: true,
    type: String
} , 


stripeSessionId: {
    type: String,
    required: true,
    unique: true
} , 
paymentIntentId: {
    type: String,
    required: true
} ,

    propertyName:{
         type: String,
    required: true,
    }  ,

cityname:{
     type: String,
    required: true,
} ,

desc:{
     type: String,
    required: true,
} , 
  files:[
    {
        type: String,
        required: true,
    }
] ,



})



const Payment = mongoose.model("payment" , PaymentSchema)

module.exports = Payment
