import React from 'react';
import missionIcon from '../assets/mission.png';
import valuesIcon from '../assets/values.png';
import missionImage from '../assets/mission-img.png'; // Add the image you want for 'Our Mission'

function MissionVisionValues() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-danger mb-5 animate__animated animate__fadeInDown">
          Mission, Vision & Values
        </h2>

        <div className="row g-4 justify-content-center">
          {/* Our Mission */}
          <div className="col-md-6">
            <div className="border p-4 bg-white h-100 text-center hover-shadow animate__animated animate__fadeInLeft">
              <img src={missionIcon} alt="Mission" width="80" className="mb-3" />
              <h4 className="text-danger fw-semibold mb-3">Our Mission</h4>
              <p className="text-muted">
              To empower organizations by connecting them with the right people and the right practices, creating workplaces that are compliant, capable, and future-ready..
              </p>

              {/* Add the mission image below */}
              <img src={missionImage} alt="Our Mission Visual" className="img-fluid mt-4" />

            </div>
          </div>

          {/* Our Vision and Values */}
          <div className="col-md-6">
            <div className="border  p-4 bg-white h-100 text-center hover-shadow animate__animated animate__fadeInRight">
              <img src={valuesIcon} alt="Vision and Values" width="80" className="mb-3" />
              <h4 className="text-danger fw-semibold mb-3">Our Vision & Values</h4>
              <p className="text-muted text-start">
              Our vision is to be a trusted partner in workforce transformation, empowering businesses to thrive through strategic staffing, innovative solutions, and a human-centric approach. We are driven by integrity in every action, transparency in communication, and excellence in all that we do.
              <p className="text-muted text-start">
               Our core values are centered around building lasting relationships by deeply understanding client needs and aligning our efforts with their goals. We are committed to delivering personalized solutions that create measurable impact—empowering talent, optimizing operations, and driving sustainable growth.
              </p>
              </p>
              <p className="text-muted text-start">
              With a focus on long-term partnerships and a personalized approach, we aim to deliver exceptional value through professionalism, adaptability, and a relentless 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVisionValues;
