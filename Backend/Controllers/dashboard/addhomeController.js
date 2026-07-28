
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");

const Home = require("../../Models/Home")
const addhome = async(req , res)=>{
 const {email} = req.body
    try {

const files = [];

for (const file of req.files) {

    const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "havenly"
    });

    files.push(uploadResult.secure_url);

    fs.unlinkSync(file.path);
}



        const result = await Home.create({

             ...req.body,
             files: files,
             owner: req.user.id,
           
        })
        await result.populate("owner")
        

     return   res.status(201).json(result)


    } catch (error) {
       console.error(error);
     return  res.status(500).json({
            message: "Something went wrong"
        })
    }
    
}
module.exports = addhome;

















