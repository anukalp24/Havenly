const { array } = require("../../Middleware/upload")
const Home = require("../../Models/Home")
const Search =  async (req , res)=>{
    try {

        const {search} = req.body
     const home  = await Home.find({
        $or: [
{
            cityname: {
                $regex: search,
                $options: "i"
            }, 
        } ,

        {
            category: {
                $regex: search,
                $options: "i"
            }
        }
        ]
     })


if(home.length === 0){
        return res.status(404).json({
            message: "Home not found"
        })
     }



     res.status(200).json({
        message: "Home found succesfully",
        home: home
     })
     
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports  = Search








