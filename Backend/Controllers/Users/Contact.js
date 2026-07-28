const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const contact = async (req, res) => {
  try {
 const { name, email, message, subject, phoneNumber } = req.body;

   await resend.emails.send({
  from: "onboarding@resend.dev",
  to: process.env.EMAIL_USER,
  subject: `New Contact Form: ${subject}`,
  html: `
    <h2>New Contact Form</h2>

    <hr>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Phone Number:</strong> ${phoneNumber}</p>

    <p><strong>Subject:</strong> ${subject}</p>

    <p><strong>Message:</strong></p>

    <p>${message}</p>
  `,
});

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to send message",
    });
  }
};

module.exports = contact;