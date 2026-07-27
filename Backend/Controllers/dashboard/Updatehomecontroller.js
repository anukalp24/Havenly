


const Home = require("../../Models/Home")

const updateHome =  async (req , res)=>{
console.log("update controler jsut hitted")
  try {
      const home = await Home.findOne({
          _id: req.params.id,
          owner: req.user.id
      });

      if(!home){
        return res.status(404).json({
            message: "Home not found"
        })
      }

      if(req.files.length === 0){
        req.files = []
      }
    const files  = req.files.map(file=>(
        `${import.meta.env.VITE_API_URL}/uploads/${file.filename}`
    ))


    const allFiles = [...home.files , ... files]

    home.set({
  ...req.body,
  files: allFiles
});

await home.save();




return res.status(200).json({
home: home,
message: "Home updated successfully"
})

  } catch (error) {
    return res.status(500).json({
        message: "Internal error"
    })
  }


}

module.exports = updateHome

