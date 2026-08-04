const User = require("../../Models/User")

const logOut = async (req , res)=>{
try{

    const refreshToken = req.cookies.refreshToken
if(!refreshToken){
    return res.status(404).json({
        message: "No refresh token was found"
    }
    )
}
    
const exist = await User.findOne({
 refreshToken: refreshToken
})

if(!exist){
    return res.status(404).json({
        message: "User not found"
    })
}



exist.refreshToken = ""

await exist.save()

  res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});


res.clearCookie("accessToken" , {
      httpOnly: true,
  secure: true,
  sameSite: "none",
})

return res.status(200).json({
    message: "Logout successfull"
})


}

catch(error){
return res.status(500).json({
    message: "Some internal error occured"
})
}
}

module.exports = logOut