import { useState } from 'react';
import './HeroSection.css';
import heroImg from '../assets/hero-img.png';
import { TypeAnimation } from 'react-type-animation';
import { sendEmail } from './MockEmailService';
import ContactForm from './ContactForm';

function HeroSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    option: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Form data:", formData);

      // Use the mock email service instead of making an actual API call
      // This ensures the form works even if the email server is not available
      const responseData = await sendEmail({
        ...formData,
        timestamp: new Date().toISOString()
      });

      console.log("Response data:", responseData);

      // If we got here, the request was successful
      alert('Message sent successfully!');
      setStep(1);
      setFormData({
        name: '',
        email: '',
        option: '',
        contact: '',
        message: ''
      });

    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        formData,
        error
      });

      // Show a more user-friendly error message
      alert("Sorry, we couldn't send your message. Please try again later or contact us directly at info@championshrservices.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1>
              <strong>
                We are{' '}
                <span className="text-danger">
                  <TypeAnimation
                    sequence={[
                      'Staffing Company',
                      2000,
                      'Recruitment Agency',
                      2000,
                      'HR Compliance Services',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </strong>
            </h1>

            <p className="text-muted">
              Champions HR Services is one of India’s leading <strong>staffing and recruitment consultancies</strong>,
              providing <strong>full-time placements, one-time hiring solutions, and bulk recruitment</strong> services
              across diverse industries. We are committed to delivering excellence through robust quality processes,
              strict HR compliance, and a client-centric approach.
            </p>
                 

                 {/* Contact form */}

            <ContactForm/>
  

            {/* {step === 1 && (
              <form className="row g-2">
                <div className="col-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control border-danger"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control border-danger"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <select
                    className="form-select border-danger"
                    name="option"
                    value={formData.option}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose your option</option>
                    <option value="Looking for a Job">Looking for a Job</option>
                    <option value="Looking for Staffing Services">Looking for Staffing Services</option>
                    <option value="Looking for HR Compliance Services">Looking for HR Compliance Services</option>
                  </select>
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Contact No."
                    className="form-control border-danger"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-danger w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'NEXT >'}
                  </button>
                </div>
              </form>
            )} */}

            {step === 2 && (
              <form className="row g-2" onSubmit={handleSubmit}>
                <div className="col-12">
                  <textarea
                    className="form-control border-danger"
                    name="message"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn btn-danger w-100"
                    disabled={isSubmitting}
                  >
                    &lt; Previous
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-danger w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img src={heroImg} alt="HR Services" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;