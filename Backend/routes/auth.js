const express = require("express")
const auth = express.Router()
const signin = require("../Controllers/Auth/signinController")
const login = require("../Controllers/Auth/loginController")
const forgetPassword = require("../Controllers/Auth/forgotPassword")
const ResetPassword = require("../Controllers/Auth/ResetPassword")
const refreshToken = require("../Controllers/Auth/RefreshToken")
const emailVerification = require("../Controllers/Auth/EmailVerification")
const logout   = require("../Controllers/Auth/logoutController")
const rateLimiter = require("../Middleware/rateLimiter")
const profile = require("../Controllers/Auth/Profile")

const authMiddleware = require("../Middleware/authMiddleware")














auth.post("/signin", rateLimiter ,  signin)
auth.post("/login", rateLimiter ,  login)
auth.post("/refresh" , refreshToken )
auth.post("/forget-Password" , rateLimiter , forgetPassword )
auth.post("/reset-password/:token" , ResetPassword )
auth.post("/email-verification" ,emailVerification )
auth.post("/logout" , logout )
auth.get("/profile" , authMiddleware , profile )
module.exports = auth