import React, { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1); // Track the current step
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [option, setOption] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  // Handle Next button click (move to the next step)
  const handleNext = () => {
    if (step === 1) {
      if (!name || !email || !option || !contact) {
        alert('Please fill out all fields.');
        return;
      }
    }
    setStep(step + 1);
  };

  // Handle Previous button click (move to the previous step)
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Handle form submission (Step 2)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission logic, e.g., send data to API
    alert('Your message has been sent!');
  };

  return (
    <section className="py-5 bg-black">
      <div className="container">
        <h2 className="text-center fw-bold text-danger ">Let Us Reach You</h2>
        <h5 className="text-center  text-light mb-3">Leave your details and we will get in touch</h5>

        {/* Step 1: Basic Info Form */}
        {step === 1 && (
          <form className="row g-2">
            <div className="col-6">
              <input
                type="text"
                placeholder="Name"
                className="form-control border-danger"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <input
                type="email"
                placeholder="Email"
                className="form-control border-danger"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <select
                className="form-select border-danger"
                value={option}
                onChange={(e) => setOption(e.target.value)}
                required
              >
                <option value="Choose your option">Choose your option</option>
{/* <option value="I am looking for IT Staffing">I am looking for IT Staffing</option> */}
<option value="I am looking for a Job">I am looking for a Job</option>
<option value="I am looking for  Services">I am looking for  Services</option>
<option value="I am an Ex/Current Employee">I am an Ex/Current Employee</option>
              </select>
            </div>
            <div className="col-6">
              <input
                type="tel"
                placeholder="Contact No."
                className="form-control border-danger"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <button type="button" onClick={handleNext} className="btn btn-danger w-100">
                NEXT &gt;
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Message Form */}
        {step === 2 && (
          <form className="row g-2" onSubmit={handleSubmit}>
            <div className="col-12">
              <textarea
                className="form-control border-danger"
                placeholder="Message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Previous Button (only visible when step === 2) */}
            <div className="col-6">
              <button type="button" onClick={handlePrevious} className="btn btn-danger w-100">
                &lt; Previous
              </button>
            </div>

            <div className="col-6">
              <button type="submit" className="btn btn-danger w-100">
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default MultiStepForm;
