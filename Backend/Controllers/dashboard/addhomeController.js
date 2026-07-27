


const Home = require("../../Models/Home")
const addhome = async(req , res)=>{
 const {email} = req.body
    try {
console.log("hitted baby")
   const files = req.files.map(file =>(
`${import.meta.env.VITE_API_URL}/uploads/${file.filename}`
   ))
   

        const result = await Home.create({

             ...req.body,
             files: files,
             owner: req.user.id,
           
        })
        await result.populate("owner")
        

     return   res.status(201).json(result)


    } catch (error) {
     return  res.status(500).json({
            message: "Something went wrong"
        })
    }
  
    
}
module.exports = addhome;

















