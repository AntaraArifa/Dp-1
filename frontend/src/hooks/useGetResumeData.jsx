import { useState, useEffect } from "react";
import axios from "axios";
import { RESUME_API_END_POINT } from "../utils/constant";

// Assuming you will fetch by a specific ID
export const useGetResumeData = (resumeId) => {  // Take resumeId as an argument
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get(`${RESUME_API_END_POINT}/resumes/${resumeId}`);  // Use the ID to fetch specific resume
        if (response.data) {
          setData(response.data);  // Handle the response data as needed
        } else {
          setError("No resume found.");
        }
      } catch (err) {
        console.error("Error fetching resume data:", err);
        setError("Failed to load resume data.");
      }
    };

    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]);  // Only re-fetch when resumeId changes

  return { data, error };
};
