const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({



    admin:{
        type: String,
        default: false
    } ,


    name:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
  
refreshToken: {
    type: String,
    default: ""
},
// resetToken: {
//     type: String,
//     default: ""
// }  ,


// resetTokenExpiry: {
// type: Date,
// default: ""
// } ,

// isVerified: {
//     type: Boolean,
//     default: false
// } ,

// emailVerificationOtp: {
//     type: String
// } ,
// emailVerificationExpiry:{
//     type: Date
// }

})

const User = mongoose.model("User" , userSchema)
module.exports = User