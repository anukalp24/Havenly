const User = require("../../Models/User")

const profile = async(req , res)=>{
console.log("user profile hitted right now")
    try {
        const user = await User.findOne({
            _id: req.user.id
        })


        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
user: user
        }) 

    } catch (error) {
        return res.status(500).json({
            message: "Some error occured"
        })
    }
}

module.exports = profile