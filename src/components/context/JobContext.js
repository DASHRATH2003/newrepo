import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const JobContext = createContext();
const API_BASE_URL = "http://localhost:5000/job";

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [error, setError] = useState(null);
  const [recentJobsError, setRecentJobsError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      console.log("Fetching jobs...");
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/all-jobs`);
      console.log("Jobs API Response:", response.data);
      
      if (response.data.success) {
        setJobs(response.data.data || []);
      } else {
        console.error("API returned success: false", response.data);
        setError("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.response || error);
      setError(error.response?.data?.message || "Failed to load jobs");
      setJobs([]); // Reset jobs on error
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies needed for fetchJobs

  const fetchRecentJobs = useCallback(async () => {
    try {
      console.log("Fetching recent jobs...");
      setIsLoadingRecent(true);
      setRecentJobsError(null);
      
      const response = await axios.get(`${API_BASE_URL}/recent-jobs`);
      console.log("Recent Jobs API Response:", response.data);
      
      if (response.data.success) {
        setRecentJobs(response.data.data || []);
      } else {
        console.error("API returned success: false for recent jobs", response.data);
        setRecentJobsError("Failed to fetch recent jobs");
      }
    } catch (error) {
      console.error("Error fetching recent jobs:", error.response || error);
      setRecentJobsError(error.response?.data?.message || "Failed to load recent jobs");
      setRecentJobs([]); // Reset recent jobs on error
    } finally {
      setIsLoadingRecent(false);
    }
  }, []); // No dependencies needed for fetchRecentJobs

  const addJob = async (jobData) => {
    try {
      console.log("Adding job with data:", jobData);
      setIsLoading(true);
      setError(null);
      
      // Optimistically update the UI
      const tempJob = {
        ...jobData,
        _id: 'temp_' + Date.now(), // Temporary ID
        createdAt: new Date().toISOString()
      };
      
      // Update both jobs and recent jobs immediately
      setJobs(prevJobs => [tempJob, ...prevJobs]);
      setRecentJobs(prevRecentJobs => {
        const updatedRecentJobs = [tempJob, ...prevRecentJobs];
        return updatedRecentJobs.slice(0, 5); // Keep only 5 most recent
      });
      
      const response = await axios.post(`${API_BASE_URL}/create-job`, jobData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Add job response:", response.data);

      if (response.data.success) {
        // Update with the real data from server
        await fetchJobs();
        await fetchRecentJobs();
        return response.data.data;
      } else {
        // Revert optimistic updates on error
        setJobs(prevJobs => prevJobs.filter(job => job._id !== tempJob._id));
        setRecentJobs(prevJobs => prevJobs.filter(job => job._id !== tempJob._id));
        throw new Error(response.data.message || "Failed to create job");
      }
    } catch (error) {
      console.error("Error adding job:", error.response || error);
      throw error.response?.data || error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJob = async (updatedJob) => {
    try {
      console.log("Updating job:", updatedJob);
      setIsLoading(true);
      setError(null);
      
      const response = await axios.put(
        `${API_BASE_URL}/update-job/${updatedJob._id}`,
        updatedJob,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        await fetchJobs(); // Refresh the jobs list
        await fetchRecentJobs(); // Also refresh recent jobs list
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error.response || error);
      throw error.response?.data || error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      console.log("Deleting job:", id);
      setIsLoading(true);
      setError(null);
      
      const response = await axios.delete(`${API_BASE_URL}/delete-job/${id}`);

      if (response.data.success) {
        await fetchJobs(); // Refresh the jobs list
        await fetchRecentJobs(); // Also refresh recent jobs list
      } else {
        throw new Error(response.data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error.response || error);
      throw error.response?.data || error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch jobs and recent jobs when component mounts
  useEffect(() => {
    fetchJobs();
    fetchRecentJobs();
  }, [fetchJobs, fetchRecentJobs]);

  const contextValue = {
    jobs,
    recentJobs,
    isLoading,
    isLoadingRecent,
    error,
    recentJobsError,
    addJob,
    updateJob,
    deleteJob,
    refreshJobs: fetchJobs,
    refreshRecentJobs: fetchRecentJobs
  };

  return (
    <JobContext.Provider value={contextValue}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);