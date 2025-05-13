import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import {
  // FaUserTie, // Commented out unused import
  FaUsersCog,
  // FaBrain, // Commented out unused import
  FaMoneyCheckAlt,
  // FaSearch, // Commented out unused import
  // FaClipboardCheck // Commented out unused import
} from 'react-icons/fa';

const servicesData = [
  // {
  //   icon: <FaUserTie size={40} />,
  //   title: "HR Consulting",
  //   desc: "Effective HR Management is based on strong, simple and effective HR Processes.",
  //   path: "/services/hr-consulting"
  // },
  {
    icon: <FaUsersCog size={40} />,
    title: "Professional Staffing and Recruitment",
    // desc: "Finding the right talent for the right role is essential to driving your organization’s success.",
    // path: "/services/professional-staffing"
  },
  // {
  //   icon: <FaBrain size={40} />,
  //   title: "Flexi Staffing",
  //   desc: "Flexibility, productivity, and legal compliance made easy through temporary staffing.",
  //   path: "/services/flexi-staffing"
  // },
  {
    icon: <FaMoneyCheckAlt size={40} />,
    title: "HR Compliance Services",
    // desc: "Supporting your employees’ well-being starts with ensuring payroll and compliance are handled seamlessly.",
    // path: "/services/payroll-compliance"
  },
  // {
  //   icon: <FaSearch size={40} />,
  //   title: "IT Services/Consulting",
  //   desc: "Today’s complex business needs demand flexible IT consulting and scalable technology.",
  //   path: "/services/it-consulting"
  // },
  // {
  //   icon: <FaClipboardCheck size={40} />,
  //   title: "Background Verification Check",
  //   desc: "Comprehensive services to ensure credible background knowledge of candidates.",
  //   path: "/services/background-check"
  // }
];

const Services = () => {
  return (
    <section className="py-5 bg-light text-center" id="services">
      <div className="container">
        <h2 className="mb-4 fw-bold text-danger position-relative d-inline-block">
          Our Services
          <div className="underline mx-auto mt-2" />
        </h2>
        <div className="row">
          {servicesData.map((service, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Link to={service.path} className="text-decoration-none text-dark">
                <div className="p-4 bg-white shadow-sm h-100 rounded-4 service-card">
                  <div className="mb-3 text-danger">{service.icon}</div>
                  <h5 className="fw-bold">{service.title}</h5>
                  <p className="text-muted small">{service.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/services/staffing">
          <button className="btn btn-danger mt-3">Read More</button>
        </Link>
      </div>
    </section>
  );
};

export default Services;
