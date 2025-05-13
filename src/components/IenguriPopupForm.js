import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';


function FloatingChatForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    option: ''
  });

  const handleToggle = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with actual submission logic
    alert('🎉 Thank you for contacting us!');
    setOpen(false);
    setFormData({ name: '', email: '', phone: '', option: '' });
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chat-button" onClick={handleToggle}>
        {open ? '➖' : '💬'}
      </div>

      {/* Floating Form */}
      <div className={`chat-form-container ${open ? 'open' : ''}`}>
        <Card className="chat-card shadow-lg">
          <Card.Body>
            <Card.Title className="text-center text-danger">
              Enquiry Form 🚀
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Choose a Service</Form.Label>
                <Form.Select
                  name="option"
                  value={formData.option}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Looking for a Job">Looking for a Job</option>
                  <option value="Looking for Staffing Services">
                    Looking for Staffing Services
                  </option>
                  <option value="Looking for HR Compliance Services">
                    Looking for Compliance Services
                  </option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="danger" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default FloatingChatForm;
