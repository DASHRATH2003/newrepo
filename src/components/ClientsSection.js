import React from "react";
import "../components/ClientsSection.css";
// import logo from "../assets/clients/logo 1.webp"; // Commented out unused import

const ClientsSection = () => {
  return (
    <section style={{ backgroundColor: "#f8f9fa", padding: "60px 0" }}>
      <div className="container text-center">
        {/* Find a Job Section */}
        <h2 className="fw-bold mb-3">Find Your Dream Job and Access HR Compliance Services
        </h2>
        <div
          style={{
            width: "100px",
            height: "3px",
            backgroundColor: "red",
            margin: "0 auto 30px auto",
          }}
        ></div>
        <p style={{ margin: "0 auto", fontSize: "1.1rem" }}>
        As one of India's leading staffing and recruitment agencies, we have a proven track record of being among the top recruiters. Recognized as one of the best job consultancies in the country, we are dedicated to helping you secure the right opportunity while providing comprehensive HR compliance services.
        </p>

        {/* Single Client Section */}
        {/* <h2 className="fw-bold mt-5 mb-3 text-danger">Our Client</h2>
        <div
          style={{
            width: "100px",
            height: "3px",
            backgroundColor: "red",
            margin: "0 auto 30px auto",
          }}
        ></div> */}

        {/* <img src={logo} alt="client-logo" className="client-logo mx-auto" /> */}
      </div>
    </section>
  );
};

export default ClientsSection;
