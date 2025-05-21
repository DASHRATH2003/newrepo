import React, { useState, useEffect } from "react";
import { useJobContext } from "./context/JobContext";
import mockJobs from "../data/mockJobs"; // Import directly for fallback

const Jobs = () => {
  // Get jobs data and state from context
  const { jobs, isLoading: contextLoading, error: contextError, refreshJobs } = useJobContext();

  // Local state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    experience: "",
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // for modal

  // Use this effect to initialize jobs and handle loading state
  useEffect(() => {
    console.log("Jobs component mounted");

    // Try to refresh jobs data
    refreshJobs();

    // Set a timeout to ensure we show loading state for at least 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [refreshJobs]);

  // Update local error state when context error changes
  useEffect(() => {
    if (contextError) {
      setError(contextError);
    }
  }, [contextError]);

  // This effect runs when jobs change or filters change
  useEffect(() => {
    console.log("Jobs data or filters changed:", {
      jobsLength: jobs?.length || 0,
      searchTerm,
      filters
    });

    try {
      filterJobs();
    } catch (err) {
      console.error("Error filtering jobs:", err);
      setError("Error filtering jobs. Please try again.");

      // Use mockJobs as fallback
      setFilteredJobs(mockJobs);
    }
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
    // Safety check for jobs array
    if (!jobs || !Array.isArray(jobs) || jobs.length === 0) {
      console.warn("Jobs array is empty or invalid, using mockJobs as fallback");
      setFilteredJobs(mockJobs);
      return;
    }

    try {
      const filtered = jobs.filter((job) => {
        // Safety checks for each property
        const position = job.position || "";
        const category = job.category || "";
        const jobLocation = job.jobLocation || "";
        const experience = job.experience || "";

        const matchesSearch = position.toLowerCase().includes((searchTerm || "").toLowerCase());
        const matchesCategory = filters.category ? category === filters.category : true;
        const matchesLocation = filters.location ? jobLocation.includes(filters.location) : true;
        const matchesExperience = filters.experience ? experience === filters.experience : true;

        return matchesSearch && matchesCategory && matchesLocation && matchesExperience;
      });

      console.log("Filtered jobs:", filtered.length);
      setFilteredJobs(filtered);
    } catch (err) {
      console.error("Error in filterJobs:", err);
      // Use mockJobs as fallback
      setFilteredJobs(mockJobs);
    }
  };

  return (
    <div className="container py-5">
      {/* <h2 className="text-center mb-4 fw-bold text-danger">Job Openings</h2> */}

      {/* Search Bar
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-danger" type="button">
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      </div> */}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center my-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading job listings...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Jobs</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      )}

      {/* Main Content - Only show when not loading */}
      {!isLoading && !error && (
        <div className="row">
          {/* Left Column - Filters and Jobs */}
          <div className="col-md-8">
            {/* Filters */}
            {/* <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Filter Jobs</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                      id="category"
                      name="category"
                      className="form-select"
                      value={filters.category}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Categories</option>
                      <option value="IT">IT</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Customer Service">Customer Service</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <select
                      id="location"
                      name="location"
                      className="form-select"
                      value={filters.location}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Locations</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Pune">Pune</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="experience" className="form-label">Experience</label>
                    <select
                      id="experience"
                      name="experience"
                      className="form-select"
                      value={filters.experience}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Experience</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2-4 years">2-4 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-7 years">5-7 years</option>
                      <option value="5-8 years">5-8 years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Job Listings */}
            <h4 className="mb-3">Available Positions ({filteredJobs.length})</h4>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{job.position}</h5>
                    <div className="d-flex flex-wrap mb-3">
                      <span className="badge bg-light text-dark me-2 mb-1">
                        <i className="bi bi-briefcase me-1"></i> {job.category}
                      </span>
                      <span className="badge bg-light text-dark me-2 mb-1">
                        <i className="bi bi-geo-alt me-1"></i> {job.jobLocation}
                      </span>
                      <span className="badge bg-light text-dark me-2 mb-1">
                        <i className="bi bi-clock-history me-1"></i> {job.experience}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1"><strong>Education:</strong> {job.education}</p>
                      {job.driveLocation && (
                        <p className="mb-1"><strong>Drive Location:</strong> {job.driveLocation}</p>
                      )}
                      {job.description && (
                        <p className="mb-1"><strong>Description:</strong> {job.description}</p>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setSelectedJob(job)}
                      >
                        <i className="bi bi-eye me-1"></i> View Details
                      </button>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-danger btn-sm"
                      >
                        <i className="bi bi-send me-1"></i> Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                No jobs found matching your criteria. Try adjusting your filters.
              </div>
            )}
          </div>

          {/* Right Column - Recent Jobs */}
          <div className="col-md-4">
            <div className="card border-danger mb-4 shadow-sm sticky-top" style={{ top: "20px" }}>
              <div className="card-header bg-danger text-white">
                <h5 className="mb-0">Recent Job Openings</h5>
              </div>
              <ul className="list-group list-group-flush">
                {Array.isArray(jobs) && jobs.length > 0 ? (
                  [...jobs].slice(-5).reverse().map((job) => (
                    <li
                      key={job.id}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <h6 className="mb-1">{job.position}</h6>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">{job.jobLocation}</small>
                        <small className="text-muted">{job.experience}</small>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center">
                    <i className="bi bi-info-circle me-2"></i>
                    No recent jobs available
                  </li>
                )}
              </ul>
              <div className="card-footer bg-light">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger btn-sm w-100"
                >
                  <i className="bi bi-file-earmark-text me-1"></i> Submit Your Resume
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="card border-secondary mb-4 shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Need Help?</h5>
              </div>
              <div className="card-body">
                <p>Can't find what you're looking for? Contact our recruitment team for assistance.</p>
                <a
                  href="mailto:info@championshrservices.com"
                  className="btn btn-outline-secondary btn-sm w-100 mb-2"
                >
                  <i className="bi bi-envelope me-1"></i> Email Us
                </a>
                <a
                  href="tel:+911234567890"
                  className="btn btn-outline-secondary btn-sm w-100"
                >
                  <i className="bi bi-telephone me-1"></i> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-danger">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">{selectedJob.position}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedJob(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-danger">Job Details</h6>
                    <p><strong>Category:</strong> {selectedJob.category}</p>
                    <p><strong>Experience:</strong> {selectedJob.experience}</p>
                    <p><strong>Education:</strong> {selectedJob.education}</p>
                    {selectedJob.description && (
                      <p><strong>Description:</strong> {selectedJob.description}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-danger">Location</h6>
                    <p><strong>Job Location:</strong> {selectedJob.jobLocation}</p>
                    {selectedJob.driveLocation && (
                      <p><strong>Drive Location:</strong> {selectedJob.driveLocation}</p>
                    )}
                    <h6 className="text-danger mt-3">How to Apply</h6>
                    <p>Click the Apply button below to submit your application through our online form.</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedJob(null)}
                >
                  <i className="bi bi-x-circle me-1"></i> Close
                </button>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScRvVyo6og6ntYbH9Y12OaxBD1lCZcq_iv7TFRNpW3BbTralg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger"
                >
                  <i className="bi bi-send me-1"></i> Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
