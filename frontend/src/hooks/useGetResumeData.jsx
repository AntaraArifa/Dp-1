import { useState, useEffect } from "react"; // Ensure this import is present
import axios from "axios";

export function useGetResumeData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/resumes");
        if (response.data && Array.isArray(response.data)) {
          const latestResume = response.data[0];
          setData(latestResume);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (err) {
        console.error("Error fetching resume data:", err);
        setError(err);
      }
    };

    fetchResumeData();
  }, []);

  return { data, error };
}
