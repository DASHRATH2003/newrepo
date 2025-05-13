import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StaffingIntro = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add this

  // Commented out unused functions
  // const handleEmployerClick = () => {
  //   navigate("/employer-form");
  // };

  // const handleJobSeekerClick = () => {
  //   navigate("/jobs");
  // };

  return (
    <>
      {location.pathname === "/" && (
        <section className="py-5 text-center bg-dark text-white">
          <div className="container">
            <h2 className="fw-bold display-5">Staffing, Recruitment and HR Compliance Services</h2>
            <hr className="mx-auto my-3" style={{ width: "60px", borderTop: "3px solid #fff" }} />
            <h5 className="mb-4">Champions HR Services</h5>
            <p className="mb-4" style={{textAlign:"justify", maxWidth: "900px", margin: "0 auto", lineHeight: "1.8" }}>
            Champions HR Services Bangalore, Karnataka. is a leading player in the global staffing and recruitment ecosystem. Since 2018, we have fostered a unique, people-centric culture that delivers a competitive advantage for our clients and meaningful career opportunities for job seekers, along with the added value of expert compliance services. Champions HR Services offers a comprehensive range of staffing, recruitment, and compliance solutions—driven by a passion for connecting organizations with smart technology investments and talented individuals poised to reach their full potential.
            </p>
            <p className="mb-4">Choose your options below and let us get associated.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {/* <button className="btn btn-danger" onClick={handleEmployerClick}>
                For Employer
              </button> */}
              {/* <button className="btn btn-danger" onClick={handleJobSeekerClick}>
                For Job Seeker
              </button> */}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default StaffingIntro;
