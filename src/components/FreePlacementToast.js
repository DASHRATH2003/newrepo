import React, { useEffect, useState } from "react";

const FreePlacementToast = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showToast && (
        <div className="toast-slide-container">
          <div
            className="toast show text-bg-light toast-slide"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto text-danger">
                🎯 100% Free Job Placement
              </strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body text-black">
              <ul className="mb-2">
                <li> No Registration Fees — Apply without paying any charges.</li>
                <li> No Consultancy Charges — No hidden fees from candidates.</li>
                <li> 100% Free Placement Support — Completely free services.</li>
                <li> Direct Company Hiring — Verified openings from top employers.</li>
                <li> Genuine Opportunities — Real career growth with trusted companies.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FreePlacementToast;
