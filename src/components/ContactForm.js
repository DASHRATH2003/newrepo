import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    // Sending email using emailjs
    emailjs
      .sendForm(
        "service_c1rxb8h", // Your EmailJS service ID
        "template_xbblxpt", // Your EmailJS template ID
        form.current,
        "MfYlkpbxTeso1ty97" // Your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("✅ Message sent successfully!");
          form.current.reset(); // Reset form after sending
        },
        (error) => {
          console.error(error.text);
          setStatus("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <div className="row">
          {/* Left Column (Name, Contact Reason) */}
          <div className="col-md-6">
            <div className="mb-3">
              <input
                type="text"
                name="user_name"
                className="form-control border-dark bg-light text-dark"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-3">
              <select
                name="contact_reason"
                className="form-select border-dark bg-light text-dark"
                required
              >
                <option value="">Choose an option</option>
                <option value="Looking for a job">Looking for a job</option>
                <option value="Looking for a staffing service">
                  Looking for a staffing service
                </option>
                <option value="Looking for HR compliance service">
                  Looking for HR compliance service
                </option>
              </select>
            </div>
          </div>

          {/* Right Column (Email, Contact Number) */}
          <div className="col-md-6">
            <div className="mb-3">
              <input
                type="email"
                name="user_email"
                className="form-control border-dark bg-light text-dark"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="tel"
                name="user_contact"
                className="form-control border-dark bg-light text-dark"
                placeholder="Your Contact Number"
                required
              />
            </div>
          </div>
        </div>

        {/* Full Width Message Box */}
        <div className="mb-3">
          <textarea
            name="message"
            rows="5"
            className="form-control border-dark bg-light text-dark"
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-outline-danger w-100 rounded-1"
        >
          Send Message
        </button>
      </form>

      {/* Status Message */}
      {status && <div className="alert alert-info mt-3 text-center">{status}</div>}
    </div>
  );
};

export default ContactForm;
