
const Home = require("../../Models/Home")


 const gethomes =  async (req , res)=>{
  try {
   console.log("filter hitted")

     let page = Number(req.query.page)
     if(page < 1){
        page = 1
     }

     if(!page){
      const Homes = await Home.find().limit(12)
    return  res.status(200).json(Homes)
     }
     
     

     const limit = 10
  const skip = (page - 1) * limit
  

  let Homes = await Home.find({
   price: {
      $gte:  req.query.minPrice ,
      $lte:  req.query.maxPrice 
   }
  }).skip(skip).limit(limit)

 
     res.status(200).json(Homes)


  } catch (error) {
   console.log(error)
   res.status(500).json({
      message: "Some error occured"
   })
  }
 }
  
 module.exports = gethomes
