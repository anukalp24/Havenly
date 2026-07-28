const jwt = require("jsonwebtoken")
const User = require("../../Models/User")
const bcrypt = require("bcryptjs")
const login =  async (req , res)=>{
    try {
        const {email , password}  = req.body

        
        
        const existingUser = await User.findOne({
            email
        })
       


        if(!existingUser){
            return res.status(404).json({
                message: "No account exist with this email"
            })
        }


        // if(existingUser.isVerified === false){
        //     return res.status(403).json({
        //         message: "Please verify your email first"
        //     })
        // }

        const isMatch = await bcrypt.compare(password , existingUser.password)
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
 
const accessToken = jwt.sign({
   id: existingUser._id
}, process.env.JWT_SECRET,
   {expiresIn: "15m"}
)

 const refreshToken = jwt.sign({
      id: existingUser._id
    },
  process.env.JWT_REFRESH_SECRET,
  {expiresIn: "30d"}
  )

existingUser.refreshToken = refreshToken
await existingUser.save()


 
res.cookie("refreshToken" , refreshToken , {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 30 * 24* 60 * 60 *1000
})

         return res.status(200).json({
            message: "Login Successfully",
            accessToken: accessToken
         })
        


    } catch (error) {
        res.status(500).json({
            message: "Somehting went wrong"
        })
    }
}

module.exports =  login