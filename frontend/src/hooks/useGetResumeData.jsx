import { useState, useEffect } from "react";
import axios from "axios";
import { RESUME_API_END_POINT } from "../utils/constant";

// Helper function to validate MongoDB ObjectId format
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

export default function useGetResumeData(resumeId) {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Validate resumeId before making the API call
    if (!resumeId) {
      console.warn("No resumeId provided. Skipping API call.");
      setError("No resumeId provided.");
      setLoading(false);
      return;
    }

    if (!isValidObjectId(resumeId)) {
      console.warn("Invalid resumeId format. Skipping API call.");
      setError("Invalid resumeId format.");
      setLoading(false);
      return;
    }

    // Async function to fetch resume data
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors

        console.log(`Fetching resume data for ID: ${resumeId}`);

        // Make the API request
        const response = await axios.get(`${RESUME_API_END_POINT}/${resumeId}`);

        // Check if the response contains the expected data
        if (response.data?.resume) {
          setResumeData(response.data.resume);
          console.log("Resume data fetched successfully:", response.data.resume);
        } else {
          console.error("Unexpected API response format:", response.data);
          throw new Error("Unexpected API response format.");
        }
      } catch (err) {
        console.error("Error fetching resume data:", err.message);

        // Handle specific error scenarios
        if (err.response?.status === 400) {
          setError("Invalid request. Please check the resume ID and try again.");
        } else if (err.response?.status === 404) {
          setError("Resume not found. Please ensure the ID is correct.");
        } else {
          setError("An error occurred while fetching the resume data.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch the resume data
    fetchResumeData();
  }, [resumeId]);

  return {
    resumeData, // The fetched resume data
    error,      // Any error encountered
    loading,    // Whether the data is still being loaded
  };
}
