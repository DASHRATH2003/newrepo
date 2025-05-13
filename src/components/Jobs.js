import React, { useState, useEffect } from "react";
import { useJobContext } from "./context/JobContext";

const Jobs = () => {
  const { jobs } = useJobContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    experience: "",
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // for modal

  useEffect(() => {
    filterJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filters, jobs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filterJobs = () => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filters.category ? job.category === filters.category : true;
      const matchesLocation = filters.location ? job.jobLocation.includes(filters.location) : true;
      const matchesExperience = filters.experience ? job.experience === filters.experience : true;
      return matchesSearch && matchesCategory && matchesLocation && matchesExperience;
    });
    setFilteredJobs(filtered);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-danger">Job Openings</h2>

      <div className="row">
        {/* Left Column - Filters and Jobs */}
        <div className="col-md-8">
          {/* Filters */}
          <div className="row mb-4">
            {/* Filters can be added here if needed */}
          </div>

          {/* Job Listings */}
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title"><strong>Position:</strong> {job.position}</h5>
                  <p className="card-text">
                    <p><strong>Exp:</strong> {job.experience},{" "}</p>
                    <p><strong>Job Location:</strong> {job.jobLocation},{" "}</p>
                    {job.driveLocation && <><strong>#Drive Location:</strong> {job.driveLocation},{" "}</>}
                    <p><strong>Education:</strong> {job.education}</p>
                  </p>
                  <p className="mb-1 text-muted"><i className="bi bi-briefcase"></i> {job.category}</p>
                  <p className="mb-1 text-muted"><i className="bi bi-geo-alt"></i> {job.jobLocation}</p>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-danger btn-sm mt-2"
                  >
                    More Details
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">No jobs found matching your criteria.</div>
          )}
        </div>

        {/* Right Column - Recent Jobs */}
        <div className="col-md-4">
          <div className="card border-danger mb-4">
            <div className="card-header bg-danger text-white fw-bold">
              Recent Jobs
            </div>
            <ul className="list-group list-group-flush">
              {[...jobs].slice(-5).reverse().map((job) => (
                <li
                  key={job.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedJob(job)}
                >
                  <h6 className="mb-1">{job.position}</h6>
                  <small className="text-muted">{job.jobLocation}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">{selectedJob.position}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedJob(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Experience:</strong> {selectedJob.experience}</p>
                <p><strong>Location:</strong> {selectedJob.jobLocation}</p>
                {selectedJob.driveLocation && (
                  <p><strong>Drive Location:</strong> {selectedJob.driveLocation}</p>
                )}
                <p><strong>Education:</strong> {selectedJob.education}</p>
                <p><strong>Category:</strong> {selectedJob.category}</p>
              </div>
              <div className="modal-footer">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-danger"
                >
                  Apply / More Details
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Jobs;
