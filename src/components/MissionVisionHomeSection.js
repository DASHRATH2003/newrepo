import React from "react";
import { useLocation } from "react-router-dom";
import missionVisionImage from "../assets/mission-vision.png";
import icon1 from "../assets/goal.png";
import icon2 from "../assets/target.png";

const MissionVisionHomeSection = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && (
        <section className="py-5 bg-white text-dark">
          <div className="container">
            <h2 className="text-center fw-bold text-danger mb-4">Champions HR Services Mission and Vision</h2>
            <hr className="mx-auto mb-5" style={{ width: "80px", borderTop: "3px solid red" }} />

            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="mb-4 d-flex align-items-start">
                  <img src={icon2} alt="Mission" width="50" className="me-3" />
                  <div>
                    <h4 className="fw-bold">Mission</h4>
                    <p>
                    To empower organizations by connecting them with the right people and the right practices, creating workplaces that are compliant, capable, and future-ready.                    </p>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-start">
                  <img src={icon1} alt="Vision" width="50" className="me-3" />
                  <div>
                    <h4 className="fw-bold">Vision</h4>
                    <p>
                    Our vision is to be a trusted partner in workforce transformation, empowering businesses to thrive through strategic staffing, innovative solutions, and a human-centric approach. We are driven by integrity in every action, transparency in communication, and excellence in all that we do.                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 text-center">
                <img src={missionVisionImage} alt="Illustration" className="img-fluid" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MissionVisionHomeSection;
