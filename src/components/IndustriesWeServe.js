import React from 'react';

const IndustriesWeServe = () => {
  const industries = [
    { icon: "fas fa-hospital", name: "Hospitals" },
    { icon: "fas fa-industry", name: "Manufacturing & Engineering" },
    { icon: "fas fa-shopping-cart", name: "Retail, Pharma, Jewellery & E-commerce" },
    { icon: "fas fa-pills", name: "Healthcare & Pharmaceuticals" },
    { icon: "fas fa-school", name: "Preschools & Educational Institutions" },
    { icon: "fas fa-user-graduate", name: "Medical Colleges" },
    { icon: "fas fa-headset", name: "BPO & KPO (Voice, Non-Voice & Backend Ops)" },
    { icon: "fas fa-shipping-fast", name: "Logistics & Supply Chain" },
    { icon: "fas fa-university", name: "BFSI & FinTech" },
    { icon: "fas fa-lightbulb", name: "Startups & MSMEs" },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#dc3545' }}>
        Industries We Serve
      </h2>
      <div className="row">
        {industries.map((industry, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow border-0">
              <div className="card-body d-flex align-items-center">
                <i
                  className={`${industry.icon} fa-2x me-3 text-danger`}
                  style={{ minWidth: '40px' }}
                ></i>
                <h5 className="mb-0">{industry.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustriesWeServe;
