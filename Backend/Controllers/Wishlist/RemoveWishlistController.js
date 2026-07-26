
const Wishlist = require("../../Models/Wishlist")
const RemoveWishlist = async (req , res)=>{


    try {

        const exist = await Wishlist.findOneAndDelete({
            user: req.user.id,
            _id: req.params.id
        })


        if(!exist){
            return res.status(404).json({
                message: "Wishlist not found"
            })
        }





return res.status(200).json({
    message: "Home deleted from wishlist successfully"
})

    
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Some error occured"
        })
    }

    
}

    module.exports = RemoveWishlist