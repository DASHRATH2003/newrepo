import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import Logout from "../admin/Logout";

const JobManager = () => {
  const { jobs, deleteJob, refreshJobs, isLoading, error } = useJobContext();
  const navigate = useNavigate();

  // Fetch jobs only once when component mounts
  useEffect(() => {
    console.log("JobManager mounted, refreshing jobs...");
    refreshJobs();
  }, []); // Remove refreshJobs from dependency array

  // Debug logging
  useEffect(() => {
    console.log("Current jobs state:", { jobs, isLoading, error });
  }, [jobs, isLoading, error]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        refreshJobs(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-danger">Manage Jobs</h3>
        <div className="d-flex gap-2">
          <button
            className="btn btn-success"
            onClick={() => navigate("/admin/add-job")}
          >
            + Add Job
          </button>
          <Logout />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mb-3">
          <strong>Error:</strong> {error}
          <button 
            className="btn btn-link text-danger float-end" 
            onClick={refreshJobs}
          >
            Try Again
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 && !error ? (
        <div className="alert alert-info">
          No jobs available. 
          <button 
            className="btn btn-link" 
            onClick={refreshJobs}
          >
            Refresh
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <small className="text-muted">
              Showing {jobs.length} job{jobs.length !== 1 ? 's' : ''}
            </small>
            <button 
              className="btn btn-link btn-sm float-end" 
              onClick={refreshJobs}
            >
              Refresh List
            </button>
          </div>
          {jobs.map((job) => (
            <div key={job._id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title text-primary">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                    <p className="card-text">
                      <strong>Location:</strong> {job.location}<br />
                      <strong>Type:</strong> {job.type}<br />
                      {job.salary && <><strong>Salary:</strong> {job.salary}<br /></>}
                    </p>
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="mb-2">
                        <strong>Requirements:</strong>
                        <ul className="list-unstyled">
                          {job.requirements.map((req, index) => (
                            <li key={index}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="card-text">{job.description}</p>
                  </div>
                  <div className="ms-3">
                    <button
                      className="btn btn-danger btn-sm d-block mb-2"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm d-block"
                      onClick={() => navigate(`/admin/edit-job/${job._id}`, { state: job })}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobManager;
