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


const home =  await Home.aggregate([

{

$match:{
    cityname: search
}
},

{
$sort:{
    price:1
}
} ,


{
    $limit: 2
},

// its job is to return the first two document

{
    $group:{
        _id: "$cityname",

        totalHomes:{
            $sum: "1"
        },

        totalPrice:{
            $sum: "$price"
        },

        averagePrice:{
            $avg: "$price"
        } ,
        
        highestPrice:{
            $max: "$price"
        }
    } 

},

{
    $lookup:{
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetais"
    }
}


])
// After $group, you'll only get something like:

// [
//   {
//     _id: "Mumbai",
//     totalHomes: 2,
//     totalPrice: 7000,
//     averagePrice: 3500,
//     highestPrice: 4000
//   }
// ]

// You do not get the Mumbai homes anymore because $group replaced them with a summary document.

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








