
const Wishlist = require("../../Models/Wishlist")

const getwishlist = async(req , res)=>{

    try {
        
        let wishlist = await Wishlist.find({
            user: req.user.id
        }).populate("home")


    
      return  res.status(200).json({
        wishlist: wishlist
        }
        )


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Some error occured"
        })
    }
}

module.exports = getwishlist