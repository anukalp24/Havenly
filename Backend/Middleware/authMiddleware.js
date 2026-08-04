const jwt = require("jsonwebtoken")

 const authMiddleware = (req , res , next) =>{
     
     
     try {
    const token = req.cookies.accessToken
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    // decoded will return a object
    req.user =  decoded
    next()

    
} catch (error) {
    console.log(error)
    return res.status(401).json({
        message: "Invalid token"
    })
}

 }
module.exports = authMiddleware