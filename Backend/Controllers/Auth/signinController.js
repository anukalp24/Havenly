
const User = require("../../Models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);




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





await resend.emails.send({
  from: "onboarding@resend.dev",
  to: email,
  subject: "Verify Your Havenly Email Address",
  html: `
    <h2>Welcome to Havenly!</h2>

    <p>Thank you for signing up.</p>

    <p>Your verification code is:</p>

    <h1>${otp}</h1>

    <p>This code is valid for <strong>10 minutes</strong>.</p>

    <p>If you didn't create this account, you can ignore this email.</p>

    <p>Regards,<br><strong>Havenly Team</strong></p>
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