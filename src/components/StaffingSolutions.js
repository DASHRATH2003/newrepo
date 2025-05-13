import React from 'react';

const StaffingSolutions = () => {
  const services = [
    {
      icon: "fas fa-users",
      title: "Permanent Staffing",
      description: "Build strong, reliable teams with long-term talent solutions.",
    },
    {
      icon: "fas fa-layer-group",
      title: "Bulk & Volume Hiring",
      description: "Rapid hiring for expansion, seasonal spikes, or large-scale projects.",
    },
    {
      icon: "fas fa-user-tie",
      title: "Executive Search",
      description: "Strategic recruitment for leadership and niche roles.",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#dc3545' }}>Staffing Solutions</h2>
      <div className="row">
        {services.map((service, index) => (
          <div className="col-md-4 mb-4" key={index}>
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
              <div className="card-footer bg-transparent text-end border-0">
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

export default StaffingSolutions;
