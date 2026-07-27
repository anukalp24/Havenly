import "./Terms.css";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import {
    HiDocumentText,
    HiCheckCircle,
    HiShieldCheck,
    HiCreditCard,
    HiExclamationTriangle,
    HiUserGroup,
    HiEnvelope
} from "react-icons/hi2";

const Terms = () => {
    return (
        <>
        
        <Navbar/>
        <section className="terms">

            <div className="terms-hero">
                <h1>Terms & Conditions</h1>
                <p>
                    Please read these terms carefully before using UrbanStay.
                    By accessing our platform, you agree to follow the terms outlined below.
                </p>
            </div>

            <div className="terms-grid">

                <div className="term-card">
                    <HiDocumentText className="term-icon"/>
                    <h2>Acceptance of Terms</h2>
                    <p>
                        By using UrbanStay, you agree to these Terms &
                        Conditions and all applicable laws and regulations.
                    </p>
                </div>

                <div className="term-card">
                    <HiUserGroup className="term-icon"/>
                    <h2>User Responsibilities</h2>
                    <p>
                        Users must provide accurate information, maintain
                        account security, and use the platform responsibly.
                    </p>
                </div>

                <div className="term-card">
                    <HiCreditCard className="term-icon"/>
                    <h2>Bookings & Payments</h2>
                    <p>
                        All bookings are subject to availability. Payments
                        are securely processed through our payment partners.
                    </p>
                </div>

                <div className="term-card">
                    <HiShieldCheck className="term-icon"/>
                    <h2>Property Rules</h2>
                    <p>
                        Guests must respect host rules, property guidelines,
                        and local laws during their stay.
                    </p>
                </div>

                <div className="term-card">
                    <HiExclamationTriangle className="term-icon"/>
                    <h2>Cancellation Policy</h2>
                    <p>
                        Cancellation and refund eligibility depends on the
                        individual property's cancellation policy.
                    </p>
                </div>

                <div className="term-card">
                    <HiCheckCircle className="term-icon"/>
                    <h2>Account Termination</h2>
                    <p>
                        UrbanStay reserves the right to suspend or terminate
                        accounts involved in fraudulent or abusive activities.
                    </p>
                </div>

            </div>

            <div className="contact-box">
                <HiEnvelope className="contact-icon"/>

                <h2>Need Help?</h2>

                <p>
                    If you have questions regarding these Terms &
                    Conditions, please contact our support team.
                </p>

                <span>support@urbanstay.com</span>
            </div>

        </section>
        <Footer/>
        </>
    );
};

export default Terms;