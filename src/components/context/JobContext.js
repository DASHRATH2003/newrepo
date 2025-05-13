import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const API = `${config.API_BASE_URL}/api/jobs`;

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs from:", API);

      // Use fetch instead of axios for more control
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn("Warning: Response is not JSON. Content-Type:", contentType);

        // Try to parse as JSON anyway
        const text = await response.text();
        console.log("Response text:", text.substring(0, 200) + (text.length > 200 ? '...' : ''));

        try {
          const data = JSON.parse(text);
          setJobs(data);
        } catch (parseError) {
          console.error("Error parsing response as JSON:", parseError);
          // Use fallback data
          setJobs([
            { _id: 1, title: "Software Developer", location: "Remote", description: "Full-stack developer position" },
            { _id: 2, title: "UI/UX Designer", location: "Mumbai", description: "Design user interfaces" }
          ]);
        }
      } else {
        // Parse JSON response
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      // Use fallback data
      setJobs([
        { _id: 1, title: "Software Developer", location: "Remote", description: "Full-stack developer position" },
        { _id: 2, title: "UI/UX Designer", location: "Mumbai", description: "Design user interfaces" }
      ]);
    }
  };

  const addJob = async (jobData) => {
    console.log("Sending job to backend:", jobData);
    try {
      const res = await axios.post(API, jobData);
      console.log("Job added response:", res.data);
      setJobs((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding job:", error);
       // Handle error
    }
  };

  const updateJob = async (updatedJob) => {
    try {
      const res = await axios.put(`${API}/${updatedJob.id}`, updatedJob); // Send the whole updatedJob
      console.log("Updated job response:", res.data);
      setJobs((prev) =>
        prev.map((job) => (job._id === updatedJob.id ? res.data : job))
      );
    } catch (error) {
      console.error("Error updating job:", error);
      // Handle error
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
       console.error("Error deleting job:", error);
       // Handle error
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);