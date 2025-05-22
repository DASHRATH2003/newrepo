import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobContext } from './context/JobContext';
import { FaMapMarkerAlt, FaBriefcase, FaTimes } from 'react-icons/fa';
import './RecentJobPopup.css';

const RecentJobPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const { recentJobs } = useJobContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup for 5 seconds every 30 seconds
    const showInterval = setInterval(() => {
      if (recentJobs && recentJobs.length > 0) {
        setShowPopup(true);
        // Update job index for next time
        setCurrentJobIndex((prevIndex) => (prevIndex + 1) % recentJobs.length);
        
        // Hide after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
    }, 30000);

    return () => clearInterval(showInterval);
  }, [recentJobs]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleApply = (job) => {
    setShowPopup(false);
    // If there's a Google Form link, open it in a new tab
    if (job.googleFormLink) {
      window.open(job.googleFormLink, '_blank');
    } else {
      // Otherwise, navigate to the employer form with job details
      navigate('/employer-form', {
        state: {
          jobId: job._id,
          jobTitle: job.title,
          jobLocation: job.location
        }
      });
    }
  };

  if (!showPopup || !recentJobs || recentJobs.length === 0) {
    return null;
  }

  const currentJob = recentJobs[currentJobIndex];

  return (
    <div className={`recent-job-popup ${showPopup ? 'show' : ''}`}>
      <div className="popup-header">
        <h3>New Job Opening!</h3>
        <button className="close-button" onClick={handleClose}>
          <FaTimes />
        </button>
      </div>
      <div className="popup-content">
        <h4>{currentJob.title}</h4>
        <div className="job-details">
          <div className="detail-item">
            <FaMapMarkerAlt />
            <span>{currentJob.location}</span>
          </div>
          <div className="detail-item">
            <FaBriefcase />
            <span>{currentJob.experience}</span>
          </div>
        </div>
        <button 
          className="apply-button"
          onClick={() => handleApply(currentJob)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default RecentJobPopup; 