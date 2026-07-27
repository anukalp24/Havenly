import { Link } from "react-router-dom";
import "./PaymentSuccess.css";
import { HiCheckCircle, HiOutlineHome, HiOutlineClipboardList } from "react-icons/hi";
function PaymentSuccess() {
  return (
     <div className="payment-success-page">

      <div className="payment-success-card">

        <div className="payment-success-icon">
          <HiCheckCircle />
        </div>

        <h1>Payment Successful!</h1>

        <p className="payment-success-text">
          Your booking has been confirmed successfully.
          A confirmation has been sent and your reservation
          is now secured.
        </p>

        <div className="payment-success-info">

          <div className="success-info-row">
            <span>Status</span>
            <span className="success-status">Confirmed</span>
          </div>

          <div className="success-info-row">
            <span>Payment</span>
            <span>Completed</span>
          </div>

          <div className="success-info-row">
            <span>Booking</span>
            <span>Reserved</span>
          </div>

        </div>

        <div className="payment-success-buttons">

          <Link to="/bookings" className="primary-btn">
            <HiOutlineClipboardList />
            View My Bookings
          </Link>

          <Link to="/" className="secondary-btn">
            <HiOutlineHome />
            Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentSuccess;
