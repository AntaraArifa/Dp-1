import { useState, useEffect } from "react";
import axios from "axios";
import { RESUME_API_END_POINT } from "../utils/constant";

// Helper to validate ObjectId format (24-character hexadecimal string)
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

export default function useGetResumeData(resumeId) {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!resumeId) {
      setError("No resumeId provided.");
      setLoading(false);
      return;
    }

    if (!isValidObjectId(resumeId)) {
      setError("Invalid resumeId format.");
      setLoading(false);
      return;
    }

    const fetchResumeData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        console.log(`Fetching data for resumeId: ${resumeId}`);

        const response = await axios.get(`${RESUME_API_END_POINT}/${resumeId}`);
        if (response.data?.resume) {
          setResumeData(response.data.resume);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching resume data:", err.message);

        // Specific error handling based on status codes
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

    fetchResumeData();
  }, [resumeId]);

  return { resumeData, error, loading };
}
