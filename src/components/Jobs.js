import React, { useState, useEffect, useRef } from "react";
import { useJobContext } from "./context/JobContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt, FaGraduationCap, FaLocationArrow, FaUpload, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Jobs.css';

const Jobs = () => {
  const location = useLocation();
  const { 
    jobs, 
    recentJobs,
    isLoading: contextLoading, 
    isLoadingRecent,
    error: contextError,
    recentJobsError, 
    refreshJobs,
    refreshRecentJobs 
  } = useJobContext();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    refreshJobs();
    refreshRecentJobs();
  }, [refreshJobs, refreshRecentJobs]);

  useEffect(() => {
    if (jobs) {
      setFilteredJobs(jobs);
    }
  }, [jobs]);

  const handleViewJob = (jobId) => {
    navigate(`/view-job/${jobId}`);
  };

  const handleApply = (job) => {
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform?usp=sf_link";
    window.open(googleFormUrl, '_blank');
  };

  const handleResumeUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
        alert('Please upload a PDF or Word document');
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      // Here you would handle the file upload
      console.log('Resume selected:', file.name);
      // You can add your file upload logic here
    }
  };

  return (
    <div className="jobs-layout">
      <div className="jobs-container">
        <div className="jobs-list-section">
          <div className="results-header">
            <h2>Available Positions <span>({filteredJobs.length})</span></h2>
          </div>

          {contextLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading jobs...</p>
            </div>
          ) : contextError ? (
            <div className="error-message">
              <h3>Error Loading Jobs</h3>
              <p>{contextError}</p>
              <button onClick={refreshJobs}>Try Again</button>
            </div>
          ) : (
            <>
              {filteredJobs.length === 0 ? (
                <div className="no-jobs">
                  <h3>No Jobs Found</h3>
                  <p>There are currently no job openings available.</p>
                </div>
              ) : (
                <div className="jobs-grid">
                  {filteredJobs.map((job) => (
                    <div key={job._id} className="job-card">
                      {/* 1st: Job Title */}
                      <div className="job-title-section">
                        <h3>{job.title}</h3>
                      </div>

                      {/* 2nd: Category, Location, Experience */}
                      <div className="job-primary-details">
                        <span className="category-tag">{job.category}</span>
                        <div className="detail-item">
                          <FaMapMarkerAlt />
                          <span>{job.location}</span>
                        </div>
                        <div className="detail-item">
                          <FaBriefcase />
                          <span>{job.experience}</span>
                        </div>
                      </div>

                      {/* 3rd: Education */}
                      <div className="job-education">
                        <div className="detail-item">
                          <FaGraduationCap />
                          <span>{job.education}</span>
                        </div>
                      </div>

                      {/* 4th: Drive Location */}
                      {job.driveLocation && (
                        <div className="job-drive-location">
                          <div className="detail-item">
                            <FaLocationArrow />
                            <span>Drive: {job.driveLocation}</span>
                          </div>
                        </div>
                      )}

                      {/* 5th: Job Description */}
                      <div className="job-description-section">
                        <h4>Description:</h4>
                        <p className="job-description">
                          {job.description.length > 150
                            ? `${job.description.substring(0, 150)}...`
                            : job.description}
                        </p>
                      </div>

                      {/* 6th: Buttons */}
                      <div className="button-group">
                        <button 
                          className="view-button"
                          onClick={() => handleViewJob(job._id)}
                        >
                          View More
                        </button>
                        <button 
                          className="apply-button"
                          onClick={() => handleApply(job)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="sidebar-container">
        <div className="recent-jobs-card">
          <h3>Recent Job Openings</h3>
          <div className="recent-jobs-content">
            <div className="recent-jobs-list">
              {isLoadingRecent ? (
                <div className="recent-jobs-loading">
                  <div className="spinner-small"></div>
                  <p>Loading recent jobs...</p>
                </div>
              ) : recentJobsError ? (
                <div className="recent-jobs-error">
                  <p>{recentJobsError}</p>
                  <button onClick={refreshRecentJobs} className="retry-button">
                    Retry
                  </button>
                </div>
              ) : recentJobs.length === 0 ? (
                <div className="no-recent-jobs">
                  <p>No recent job openings</p>
                </div>
              ) : (
                recentJobs.map((job) => (
                  <div key={job._id} className="recent-job-item">
                    <div className="recent-job-info">
                      <h4 className="recent-job-title">{job.title}</h4>
                      <div className="recent-job-location">
                        <FaMapMarkerAlt size={12} />
                        {job.location}
                      </div>
                    </div>
                    <div className="recent-job-experience">
                      {job.experience}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="resume-upload-section">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
              <button className="submit-resume-btn" onClick={handleResumeUpload}>
                <FaUpload style={{ marginRight: '8px' }} />
                Submit Your Resume
              </button>
            </div>
          </div>
        </div>

        <div className="need-help-section">
          <h3>Need Help?</h3>
          <p>Can't find what you're looking for? Contact our recruitment team for assistance.</p>
          <div className="contact-options">
            <a href="mailto:recruitment@champions.com" className="contact-link">
              <FaEnvelope />
              Email Us
            </a>
            <a href="tel:+919632492563" className="contact-link">
              <FaPhone />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
