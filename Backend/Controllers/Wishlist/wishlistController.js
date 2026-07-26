

const Wishlist = require("../../Models/Wishlist")

const wishlistfunc  =  async (req , res)=>{
   try {
       const exist = await Wishlist.findOne({
           user: req.user.id,
           home: req.params.id
       })
       if(exist){
           return res.json({
               message: "Already in wishlist"
           })
       }
          const wishlist = await Wishlist.create({
           user: req.user.id,
           home: req.params.id
          })

          await wishlist.populate("home")



          res.status(200).json({
            wishlist,
            message: "Wishlist added successfully"
          })





          
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message: "some error occured"
    })
   }
}

    module.exports = wishlistfunc