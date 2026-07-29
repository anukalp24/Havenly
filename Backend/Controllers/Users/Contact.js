const Brevo = require("sib-api-v3-sdk");

const client = Brevo.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new Brevo.TransactionalEmailsApi();

const contact = async (req, res) => {
  try {
    const { name, email, message, subject, phoneNumber } = req.body;

    await emailApi.sendTransacEmail({
      sender: {
        name: "Havenly",
        email: process.env.SENDER_EMAIL,
      },

      to: [
        {
          email: process.env.SENDER_EMAIL,
        },
      ],

      subject: `New Contact Form: ${subject}`,

      htmlContent: `
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