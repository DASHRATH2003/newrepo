import React, { useState } from 'react';

function EmployerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    employeesNeeded: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log('Employer Form Submitted:', formData);
    alert('Your request has been submitted!');
    // Optionally reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      employeesNeeded: '',
    });
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-danger mb-4">Employer Inquiry Form</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              className="form-control border-danger"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="email"
              name="email"
              className="form-control border-danger"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="tel"
              name="phone"
              className="form-control border-danger"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="number"
              name="employeesNeeded"
              className="form-control border-danger"
              placeholder="How many employees do you need?"
              value={formData.employeesNeeded}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="col-12">
            <textarea
              name="message"
              className="form-control border-danger"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-danger w-100">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EmployerForm;
