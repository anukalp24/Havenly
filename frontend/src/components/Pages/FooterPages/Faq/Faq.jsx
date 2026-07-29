import React from 'react'
import { useState } from 'react';
import Navbar from '../../../Navbar/Navbar';
import Footer from '../../../Footer/Footer';
import "./Faq.css"
const Faq = () => {
const faqs = [
  {
    question: "How do I book a property?",
    answer:
      "Simply select your preferred property, choose your check-in and check-out dates, and proceed to secure payment through Stripe.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation policies vary by property. Please check the property's cancellation policy before confirming your booking.",
  },
  {
    question: "Are all properties verified?",
    answer:
      "Yes. Every property listed on Havenly is reviewed before being published to ensure quality and authenticity.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Absolutely. All online payments are processed securely using Stripe with industry-standard encryption.",
  },
  {
    question: "Can I contact the host before booking?",
    answer:
      "Currently, host contact details are shared after a confirmed booking to ensure a safe booking experience.",
  },
  {
    question: "What if I need help during my stay?",
    answer:
      "Our support team is available to assist you with booking issues, property concerns, or payment-related questions.",
  },
];
 const [active, setActive] = useState(null);


  return (
    <>
    <Navbar/>
    <div>
      <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <p className="faq-subtitle">
        Everything you need to know before booking.
      </p>

      <div className="faq-container">
        {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() =>
                setActive(active === index ? null : index)
            }
            >
              {faq.question}
              <span>{active === index ? "−" : "+"}</span>
            </button>

            <div
              className={`faq-answer ${
                  active === index ? "show" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
    <Footer/>
                  </>
  )
}

export default Faq
