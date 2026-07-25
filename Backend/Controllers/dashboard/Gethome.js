
const Home = require("../../Models/Home")
 const gethomes =  async (req , res)=>{

  try {
    const homes = await Home.find({
      owner: req.user.id
    })


   return res.status(200).json(homes)

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
 }                                                                   
 module.exports = gethomes
