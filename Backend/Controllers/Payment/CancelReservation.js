const Payment = require("../../Models/Payment");

const stripe = require("../../config/Stripe");

const reservation = async (req, res) => {
  try {
    const PaymentDocument = await Payment.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!PaymentDocument) {
      console.log("not found");
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    if (PaymentDocument.status === "cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled.",
      });
    }

    await stripe.refunds.create({
      payment_intent: PaymentDocument.paymentIntentId,
    });

    PaymentDocument.status = "cancelled";
    PaymentDocument.paymentStatus = "refunded";
    PaymentDocument.guestMessage =
      "Your reservation has been cancelled by the property owner.";
    PaymentDocument.ownerMessage =
      "You have successfully cancelled this booking.";
    await PaymentDocument.save();

    return res.status(200).json({
      home: PaymentDocument,
      message: "Refund initiated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = reservation;
