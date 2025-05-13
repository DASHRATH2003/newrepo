import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

const AddJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { addJob, updateJob } = useJobContext();

  const isEdit = Boolean(id);
  const existingJob = location.state;

  const [formData, setFormData] = useState({
    position: "",
    experience: "",
    jobLocation: "",
    education: "",
    category: "",
    detailsLink: "", // ✅ New field for link
  });

  useEffect(() => {
    if (isEdit && existingJob) {
      setFormData(existingJob);
    }
  }, [existingJob, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);// Add this line to inspect the form data
    if (isEdit) {
      updateJob({ ...formData, id: Number(id) });
    } else {
      addJob(formData);
    }
    navigate("/admin/manage-jobs");
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger">{isEdit ? "Edit Job" : "Add Job"}</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
        <input className="form-control mb-2" name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
        <input className="form-control mb-2" name="jobLocation" placeholder="Job Location" value={formData.jobLocation} onChange={handleChange} />
        <input className="form-control mb-2" name="education" placeholder="Education" value={formData.education} onChange={handleChange} />
        <input className="form-control mb-2" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input className="form-control mb-3" name="detailsLink" placeholder="Details Link"value={formData.detailsLink} onChange={handleChange} />
        <button className="btn btn-primary">{isEdit ? "Update Job" : "Add Job"}</button>
      </form>
    </div>
  );
};

export default AddJob;
