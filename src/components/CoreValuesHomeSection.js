import React from "react";
import { useLocation } from "react-router-dom";
import coreValuesImage from "../assets/core-values.png"; // Add your correct image name

const CoreValuesHomeSection = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && (
        <section className="py-5 bg-light text-dark">
          <div className="container">
            <h2 className="text-center fw-bold text-danger mb-4">Champions HR Services Core Values</h2>
            <hr className="mx-auto mb-5" style={{ width: "100px", borderTop: "3px solid red" }} />

            <div className="row align-items-center">

            <div className="col-md-6 text-center">
                <img src={coreValuesImage} alt="Champions HR Services Core Values" className="img-fluid" />
              </div>

              
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <span className="text-danger fw-bold">✔ Integrity</span><br />
                    <small>We demonstrate integrity, valuing honesty and strong moral principles</small>
                  </li>
                  <li className="mb-3">
                    <span className="text-danger fw-bold">✔ Excellence</span><br />
                    <small>We deliver what we promise with highest quality standard</small>
                  </li>
                  <li className="mb-3">
                    <span className="text-danger fw-bold">✔ Innovation</span><br />
                    <small>We embrace constant result-oriented innovative solutions</small>
                  </li>
                  <li className="mb-3">
                    <span className="text-danger fw-bold">✔ Passion</span><br />
                    <small>We are passionate about creating new opportunities to generate high-value return on Client’s investment</small>
                  </li>
                  <li className="mb-3">
                    <span className="text-danger fw-bold">✔ Commitment</span><br />
                    <small>We are committed about serving client and candidate key needs</small>
                  </li>
                  <li className="mb-3">
                    <span className="text-danger fw-bold">✔ Transparency</span><br />
                    <small>We operate with clear, honest and open communication</small>
                  </li>
                </ul>
              </div>

              
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CoreValuesHomeSection;
