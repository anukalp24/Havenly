const mongoose = require("mongoose")
const connectDB  =  async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
     console.log("Mongooses is connected baby 😄 ")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB