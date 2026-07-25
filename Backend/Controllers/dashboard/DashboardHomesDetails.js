const Home = require("../../Models/Home")

const dashboardHomesDetails =   async (req , res)=>{
    try {
    
        const home = await Home.findById(req.params.id)
        if(!home){
        return res.status(404).json({
                message: "Home not found"
            })
        }
        


      return  res.status(200).json({
            home, 
            message: "Home send successfully"
        })

    } catch (error) {
        console.log(error)
       return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

module.exports = dashboardHomesDetails