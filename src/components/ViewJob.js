import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobContext } from './context/JobContext';
import { FaTimes } from 'react-icons/fa';
import './ViewJob.css';

const ViewJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, refreshJobs } = useJobContext();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let foundJob = jobs?.find(j => j._id === id);
        
        if (!foundJob) {
          await refreshJobs();
          foundJob = jobs?.find(j => j._id === id);
        }

        if (foundJob) {
          setJob(foundJob);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        setError("Error loading job details");
        console.error("Error loading job:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id, jobs, refreshJobs]);

  const handleApply = () => {
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform?usp=sf_link";
    window.open(googleFormUrl, '_blank');
  };

  const handleClose = () => {
    navigate('/jobs');
  };

  if (isLoading) {
    return (
      <div className="view-job-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="view-job-container">
        <div className="error-message">
          <h3>Error Loading Job</h3>
          <p>{error || "Job not found"}</p>
          <button onClick={handleClose} className="back-button">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-job-container">
      <div className="job-content-card">
        <div className="job-header">
          <h1>{job.title}</h1>
          <button className="close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        <div className="job-content">
          <div className="content-columns">
            {/* Left Column - Job Details & Description */}
            <div className="content-column">
              <section className="details-section">
                <h2>Job Details</h2>
                <div className="details-list">
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{job.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{job.experience}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Education:</span>
                    <span className="detail-value">{job.education}</span>
                  </div>
                </div>
              </section>

              <section className="description-section">
                <h2>Description</h2>
                <p className="description-text">{job.description}</p>
              </section>
            </div>

            {/* Right Column - Location */}
            <div className="content-column">
              <section className="location-section">
                <h2>Location</h2>
                <div className="details-list">
                  <div className="detail-row">
                    <span className="detail-label">Job Location:</span>
                    <span className="detail-value">{job.location}</span>
                  </div>
                  {job.driveLocation && (
                    <div className="detail-row">
                      <span className="detail-label">Drive Location:</span>
                      <span className="detail-value">{job.driveLocation}</span>
                    </div>
                  )}
                </div>
              </section>

              <section className="how-to-apply">
                <h2>How to Apply</h2>
                <p>Click the Apply button below to submit your application through our online form.</p>
              </section>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="button-container">
            <button className="close-button" onClick={handleClose}>Close</button>
            <button className="apply-button" onClick={handleApply}>Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJob; 