import { Link } from "react-router-dom";
import "./PaymentFailed.css";
import {
  HiXCircle,
  HiOutlineHome,
  HiOutlineRefresh,
} from "react-icons/hi";



function PaymentFailed() {
  return (
    <div className="payment-failed-page">

      <div className="payment-failed-card">

        <div className="payment-failed-icon">
          <HiXCircle />
        </div>

        <h1>Payment Failed</h1>

        <p className="payment-failed-text">
          We couldn't process your payment.
          No booking has been confirmed.
          Please try again or use another payment method.
        </p>

        <div className="payment-failed-info">

          <div className="failed-info-row">
            <span>Status</span>
            <span className="failed-status">Failed</span>
          </div>

          <div className="failed-info-row">
            <span>Payment</span>
            <span>Not Completed</span>
          </div>

          <div className="failed-info-row">
            <span>Booking</span>
            <span>Not Reserved</span>
          </div>

        </div>

        <div className="payment-failed-buttons">

          <Link to="/stays" className="retry-btn">
            <HiOutlineRefresh />
            Try Again
          </Link>

          <Link to="/" className="home-btn">
            <HiOutlineHome />
            Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentFailed;
