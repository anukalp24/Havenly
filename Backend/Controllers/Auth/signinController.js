
const User = require("../../Models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const Brevo = require("@getbrevo/brevo");
const emailApi = new Brevo.TransactionalEmailsApi();

emailApi.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


const existingUser = await User.findOne({
      email,
    });
    
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
      
    if(!strongPassword.test(password)){
      return res.status(500).json({
        message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      })
    }
    
   const otp = crypto.randomInt(100000 , 1000000).toString()
 const otpExpiry = new Date(Date.now() + 10 *60 *1000)

   const hashedPassword = await bcrypt.hash(
     password,
      10 
   );

    
    const userInfo = await User.create({
      name,
      email,
      password: hashedPassword,
         emailVerificationOtp: otp,
 emailVerificationExpiry: otpExpiry
    });



await emailApi.sendTransacEmail({
      sender: {
        name: "Havenly",
        email: process.env.SENDER_EMAIL,
      },

      to: [
        {
          email: email,
        },
      ],

      subject: "Verify Your Email",
      htmlContent: `
  <h2>Welcome to Havenly 🎉</h2>

  <p>Your Email Verification OTP is:</p>

  <h1>${otp}</h1>

  <p>This OTP is valid for 10 minutes.</p>
`,
    });





    return res.status(201).json({
      message: "Account Created and successfully sent the verificationOTP to your email",
  
    });

  } catch (error) { 

    
console.log(error)
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
module.exports = newUser;