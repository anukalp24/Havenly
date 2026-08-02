const mongoose = require("mongoose")


const HomeSchema = new mongoose.Schema({


    propertyName:  {
        type: String,
        required: true
    } ,

    cityname: {
        type: String,
        required: true
    } ,

    price:{
      type:Number,
      required:true
   },

 

   files:[
    {
        type: String,
        required: true,
    }
] ,

   desc:{
      type:String,
      required:true
   },

   
     owner: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       },
       category:{
         type: String,
           required:true
       },
       country: {
         type: String,
           required:true
       }
       
})
HomeSchema.index({
   owner: 1
})

HomeSchema.index({
    cityname: 1,   
})




const Home = mongoose.model("Home", HomeSchema)


module.exports = Home