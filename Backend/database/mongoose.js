const mongoose = require("mongoose")
const connectDB  =  async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
     console.log("Mongooses is connected baby 😄 ")
  } 
  
  catch (error) {
  console.error("MongoDB connection failed:");
  console.error(error);
}

}

module.exports = connectDB