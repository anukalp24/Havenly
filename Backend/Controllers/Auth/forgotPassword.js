const User = require("../../Models/User");
const crypto = require("crypto");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    existingUser.resetToken = resetToken;
    existingUser.resetTokenExpiry = resetTokenExpiry;

    await existingUser.save();

  
    const resetLink = `https://havenlyy.vercel.app/reset-password/${resetToken}`;



    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Havenly Password Reset",
      html: `
        <h2>Reset Your Password</h2>

        <p>Click the button below to reset your password.</p>

        <a href="${resetLink}" 
           style="
             display:inline-block;
             padding:12px 20px;
             background:#2563eb;
             color:#fff;
             text-decoration:none;
             border-radius:6px;
           ">
           Reset Password
        </a>

        <p>This link expires in <strong>15 minutes</strong>.</p>

        <p>If you didn't request a password reset, you can safely ignore this email.</p>

        <p>Regards,<br><strong>Havenly Team</strong></p>
      `,
    });

    return res.status(200).json({
      message: "Reset link sent to your email",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = forgetPassword;