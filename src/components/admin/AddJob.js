import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

const AddJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { addJob, updateJob } = useJobContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isEdit = Boolean(id);
  const existingJob = location.state;

  const defaultJob = {
    title: "",
    category: "IT",
    location: "Bangalore",
    experience: "2-4 years",
    education: "B.Tech/M.Tech in Computer Science",
    driveLocation: "Bangalore Tech Park",
    description: "We are looking for a skilled software developer with experience in React and Node.js."
  };

  const [formData, setFormData] = useState(defaultJob);

  useEffect(() => {
    if (isEdit && existingJob) {
      setFormData(existingJob);
    }
  }, [existingJob, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear any previous error when user starts typing
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (isEdit) {
        await updateJob({ ...formData, id: Number(id) });
        navigate("/admin/manage-jobs", { 
          state: { message: "Job updated successfully!" } 
        });
      } else {
        const newJob = await addJob(formData);
        // Short delay to ensure the job appears in the list
        setTimeout(() => {
          navigate("/jobs", { 
            state: { message: "Job added successfully!" } 
          });
        }, 500);
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      setSubmitError(error.message || "Error submitting job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger">{isEdit ? "Edit Job" : "Add Job"}</h3>
      
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="job-form">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input 
            className="form-control" 
            name="title" 
            placeholder="e.g. Software Developer" 
            value={formData.title} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select 
            className="form-control" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            required
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Job Location</label>
          <input 
            className="form-control" 
            name="location" 
            placeholder="e.g. Bangalore" 
            value={formData.location} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience Required</label>
          <input 
            className="form-control" 
            name="experience" 
            placeholder="e.g. 2-4 years" 
            value={formData.experience} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Education Required</label>
          <input 
            className="form-control" 
            name="education" 
            placeholder="e.g. B.Tech/M.Tech in Computer Science" 
            value={formData.education} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Drive Location</label>
          <input 
            className="form-control" 
            name="driveLocation" 
            placeholder="e.g. Bangalore Tech Park" 
            value={formData.driveLocation} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea 
            className="form-control" 
            name="description" 
            placeholder="Describe the job role, responsibilities, and requirements" 
            value={formData.description} 
            onChange={handleChange}
            required 
            rows="4"
          />
        </div>

        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {isEdit ? "Updating..." : "Adding..."}
            </>
          ) : (
            isEdit ? "Update Job" : "Add Job"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
