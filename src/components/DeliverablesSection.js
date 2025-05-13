import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

const DeliverablesSection = () => {
  const location = useLocation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <>
      {location.pathname === "/" && (
        <section ref={ref} style={{ backgroundColor: "#222", color: "#fff", padding: "60px 0" }}>
          <div className="container text-center">
            <h2 className="fw-bold mb-3">Our Deliverables</h2>
            <div
              style={{
                width: "100px",
                height: "3px",
                backgroundColor: "red",
                margin: "0 auto 40px auto",
              }}
            ></div>

            <div className="row justify-content-center">
              <div className="col-6 col-md-3 mb-4">
                <h3 className="fw-bold">
                  {inView && <CountUp end={500} duration={2.5} separator="," />}+
                </h3>
                <strong className="text-danger">Contract/Temp Staff</strong>
              </div>
              <div className="col-6 col-md-3 mb-4">
                <h3 className="fw-bold">
                  {inView && <CountUp end={1500} duration={2.5} separator="," />}+
                </h3>
                <strong className="text-danger">Placements</strong>
              </div>
              <div className="col-6 col-md-3 mb-4">
                <h3 className="fw-bold">
                  {inView && <CountUp end={7} duration={2} />}+
                </h3>
                <strong className="text-danger">Years of Experience</strong>
              </div>
              <div className="col-6 col-md-3 mb-4">
                <h3 className="fw-bold">
                  {inView && <CountUp end={1} duration={2} />}+
                </h3>
                <strong className="text-danger">Office Locations</strong>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DeliverablesSection;
