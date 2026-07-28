const User  = require("../../Models/User")
  const jwt = require("jsonwebtoken");
const verification = async (req , res)=>{
    try {
       const { email , otpCode} = req.body


       const exist = await User.findOne({
        email: email,
       })
 if(!exist){
        return res.status(404).json({
            message: "User Not found"
        })
       }


       if(exist.isVerified === true){
        return res.status(409).json({
            message: "User already verified"
        })
       }

       if(exist.emailVerificationOtp !== otpCode){
        return res.status(400).json({
            message: "Invalid OTP"
        })
       }

if(exist.emailVerificationExpiry < new Date()){
    return res.status(400).json({
        message: "OTP has expired"
    })
}


      exist.isVerified = true

exist.emailVerificationOtp = "";
exist.emailVerificationExpiry = undefined;



const accessToken = jwt.sign(
      {
        id: exist._id,
      },
      process.env.JWT_SECRET,
      {expiresIn: "15m"}
    );

    
    const refreshToken = jwt.sign({
      id: exist._id
    },
  process.env.JWT_REFRESH_SECRET,
  {expiresIn: "30d"}
)


exist.refreshToken = refreshToken
await exist.save()



res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});


return res.status(200).json({
    message: "Email verified successfully",
    accessToken
});
    } catch (error) {
        return res.status(500).json({
            message: "Some error occured"
        })
    }
}


module.exports = verification