import React, { createContext, useContext, useEffect, useState } from "react";
import mockJobs from "../../data/mockJobs";

const JobContext = createContext();

// Try to load jobs from localStorage, or fallback to mockJobs
const getInitialJobs = () => {
  const stored = localStorage.getItem("jobs");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return mockJobs;
    }
  }
  return mockJobs;
};

export const JobProvider = ({ children }) => {
  // Use localStorage for persistence
  const [jobs, setJobs] = useState(getInitialJobs());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const fetchJobs = async () => {
    try {
      console.log("Using mock jobs data since backend was removed");
      setIsLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use the mock data only if nothing in localStorage
      if (!localStorage.getItem("jobs")) {
        setJobs(mockJobs);
      }

      console.log("Mock jobs loaded:", mockJobs.length);
    } catch (error) {
      console.error("Error loading mock jobs:", error);
      setError("Failed to load jobs data");

      // Use fallback data in case of any error
      if (!jobs || jobs.length === 0) {
        setJobs([
          {
            id: 1,
            position: "Software Developer",
            category: "IT",
            jobLocation: "Remote",
            experience: "2-4 years",
            education: "B.Tech/M.Tech",
            description: "Full-stack developer position"
          },
          {
            id: 2,
            position: "UI/UX Designer",
            category: "Design",
            jobLocation: "Mumbai",
            experience: "3-5 years",
            education: "Any Design degree",
            description: "Design user interfaces"
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addJob = async (jobData) => {
    console.log("Adding job (mock):", jobData);
    try {
      // Create a new job with a unique ID
      const newJob = {
        ...jobData,
        id: Date.now(), // Use timestamp as a unique ID
      };

      // Add the new job to the state
      setJobs((prev) => [...prev, newJob]);

      console.log("Job added successfully (mock)");
      return newJob;
    } catch (error) {
      console.error("Error adding job:", error);
      // Handle error
      throw error;
    }
  };

  const updateJob = async (updatedJob) => {
    console.log("Updating job (mock):", updatedJob);
    try {
      // Update the job in the state
      setJobs((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );

      console.log("Job updated successfully (mock)");
      return updatedJob;
    } catch (error) {
      console.error("Error updating job:", error);
      // Handle error
      throw error;
    }
  };

  const deleteJob = async (id) => {
    console.log("Deleting job (mock):", id);
    try {
      // Remove the job from the state
      setJobs((prev) => prev.filter((job) => job.id !== id));

      console.log("Job deleted successfully (mock)");
    } catch (error) {
      console.error("Error deleting job:", error);
      // Handle error
      throw error;
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JobContext.Provider value={{
      jobs,
      isLoading,
      error,
      addJob,
      updateJob,
      deleteJob,
      refreshJobs: fetchJobs
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);