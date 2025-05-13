import React from 'react';
import { FaUserTie, FaHandshake, FaClock, FaThumbsUp } from 'react-icons/fa';

const OurCompany = () => (
  <div className="container py-5">
    <div className="text-center mb-5">
      <h2 className="fw-bold text-danger">Our Company</h2>
      <strong className="fw-bold">
        Champions HR Services is a trusted name in talent acquisition and HR consulting,
        committed to delivering top-notch staffing solutions tailored to our clients' unique business needs.
      </strong>
    </div>

    <div className="row justify-content-center mb-5">
      <div className="col-md-10">
        <p className="mb-4">
          Founded with a vision to bridge the gap between skilled talent and growing organizations, we specialize
          in Permanent Staffing, Bulk Hiring, Executive Search and Statutory Compliance.
        </p>
        <p className="mb-4">
          We serve clients across industries such as Healthcare, Manufacturing, Retail, Education,
          Logistics, BFSI, and Startups. Our client-centric approach, domain expertise, and commitment to
          quality make us a preferred partner for businesses seeking reliable HR and staffing services.
        </p>
        <p>
          At Champions HR Services, we don't just fill positions — we build careers, empower organizations, and
          drive success through people.
        </p>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="text-center mb-4">
      <h3 className="fw-bold text-danger">Why Choose Us</h3>
      <p className="text-muted">Here’s what sets us apart</p>
    </div>

    <div className="row text-center">
      <div className="col-md-3 mb-4">
        <FaUserTie size={40} className="text-danger mb-2" />
        <h5 className="fw-bold">Industry Experts</h5>
        <p className="text-muted">Team of seasoned HR professionals with deep domain knowledge.</p>
      </div>
      <div className="col-md-3 mb-4">
        <FaHandshake size={40} className="text-danger mb-2" />
        <h5 className="fw-bold">Client-Centric Approach</h5>
        <p className="text-muted">Custom solutions designed to meet your business goals.</p>
      </div>
      <div className="col-md-3 mb-4">
        <FaClock size={40} className="text-danger mb-2" />
        <h5 className="fw-bold">Timely Delivery</h5>
        <p className="text-muted">Fast turnaround times without compromising quality.</p>
      </div>
      <div className="col-md-3 mb-4">
        <FaThumbsUp size={40} className="text-danger mb-2" />
        <h5 className="fw-bold">Proven Results</h5>
        <p className="text-muted">Track record of successful placements and client satisfaction.</p>
      </div>
    </div>
  </div>
);

export default OurCompany;
