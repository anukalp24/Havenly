
const Home =   require("../../Models/Home")

const deletehome = async (req , res)=>{
 
try {
     const deletedHome  = await Home.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id
    })
    
    
    
    if(!deletedHome){
        return res.status(404).json({
            message: "Home not found"
        })
    }
 
        return res.status(200).json({
        message: "Home Deleted Successfully"
        
    })
} catch (error) {
    return res.status(500).json({
     message: "Some error occured"
    })
}
   

}
module.exports = deletehome  