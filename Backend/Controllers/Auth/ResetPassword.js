const User = require("../../Models/User")
const bcrypt = require("bcryptjs") 

const reset =  async (req , res) =>{
    try {

        const {password} = req.body
        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        const token = req.params.token 
        const findUser  =  await User.findOne({
            resetToken:  token
        })


        if(!findUser){
            return res.status(404).json({
                message: "Invalid or expired reset link"
            })
        }

        if(!strongPassword.test(req.body.password)){
                    return res.status(400).json({
                      message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
                    })
                  }

        if(findUser.resetTokenExpiry > new Date()){
            const hashedPassword = await bcrypt.hash(password , 10)
            findUser.password = hashedPassword
            findUser.resetToken = "";
            findUser.resetTokenExpiry = undefined
            findUser.refreshToken =""


           res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
           res.clearCookie("accessToken", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
          await  findUser.save()
        }

        else{
            return res.status(400).json({
                message: "Reset link has expired"
            })
        }

     return  res.status(200).json({
        message: "Password reset successfully"
       })

    } catch (error) {
      return  res.status(500).json({
            message: "Something went wrong"
        })
    }
}

module.exports = reset