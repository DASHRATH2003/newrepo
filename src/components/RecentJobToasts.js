import React, { useEffect, useState } from "react";
import { useJobContext } from "./context/JobContext";
import { useNavigate } from "react-router-dom";

const RecentJobToasts = () => {
  const { jobs } = useJobContext();
  const [recentJobs, setRecentJobs] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (jobs.length) {
      const latestJobs = [...jobs].slice(-3).reverse(); // Last 3 jobs
      setRecentJobs(latestJobs);
      setShowToast(true);

      const timer = setTimeout(() => setShowToast(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [jobs]);

  const handleNavigate = () => {
    navigate("/jobs"); // adjust the route if needed
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1055 }}
        >
          <div
            className="toast show text-bg-light border-danger"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto text-danger">RECENT JOBS</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">
              <ul className="list-unstyled mb-2">
                {recentJobs.map((job) => (
                  <li key={job.id}>
                    <strong>{job.position}</strong> - {job.jobLocation}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleNavigate}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentJobToasts;
