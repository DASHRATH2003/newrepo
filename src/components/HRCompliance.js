import React from 'react';

const HRCompliance = () => {
  const services = [
    {
      icon: "fas fa-balance-scale",
      title: "Labor Law Compliance & Advisory",
      description: "Stay up-to-date and aligned with evolving regulations.",
    },
    {
      icon: "fas fa-file-invoice-dollar",
      title: "Payroll Management & Statutory Deductions",
      description: "PF, ESI, PT, and more with accurate processing.",
    },
    {
      icon: "fas fa-handshake",
      title: "Contract Labor & Vendor Compliance",
      description: "Ensure legal compliance across outsourced workforces.",
    },
    {
      icon: "fas fa-clipboard-check",
      title: "Audit Readiness & Inspection Support",
      description: "Be fully prepared for government inspections and audits.",
    },
    {
      icon: "fas fa-file-signature",
      title: "Registrations & Benefits",
      description: "Gratuity, Bonus, Shops & Establishment registrations handled end-to-end.",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#dc3545' }}>
        HR & Statutory Compliance
      </h2>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-lg border-0">
              <div
                className="card-header text-white d-flex align-items-center"
                style={{
                  backgroundColor: '#dc3545',
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem',
                }}
              >
                <i className={`${service.icon} me-2`}></i>
                <h5 className="card-title mb-0">{service.title}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{service.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0 text-end">
                {/* <a href="#" className="btn btn-sm text-white" style={{ backgroundColor: '#dc3545' }}>
                  Learn More <i className="fas fa-arrow-right ms-1"></i>
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRCompliance;
