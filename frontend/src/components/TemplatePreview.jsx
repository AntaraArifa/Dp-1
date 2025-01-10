import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TemplatePreview = () => {
  const { id } = useParams(); // Get the resume ID from the route parameters
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/resumes/${id}`);
        setResumeData(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Resume not found.");
        } else {
          setError("Failed to load resume data.");
        }
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading resume...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!resumeData) {
    return <p className="text-center text-gray-600">No data to display.</p>;
  }

  return (
    <div className="template-preview p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Resume Preview</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="header text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{resumeData.name || "N/A"}</h1>
          <p className="text-gray-600">{resumeData.email || "N/A"}</p>
          <p className="text-gray-600">{resumeData.phone || "N/A"}</p>
          <p className="text-gray-600">{resumeData.address || "N/A"}</p>
        </div>

        {/* Education Section */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="education mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-800 font-medium">{edu.degree || "N/A"}</p>
                <p className="text-gray-600">{edu.institution || "N/A"}</p>
                <p className="text-gray-600">{edu.year || "N/A"}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="experience mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Experience</h3>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-800 font-medium">{exp.jobTitle || "N/A"}</p>
                <p className="text-gray-600">{exp.company || "N/A"}</p>
                <p className="text-gray-600">{exp.duration || "N/A"}</p>
                <p className="text-gray-600">{exp.description || "N/A"}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="skills">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
            <ul className="list-disc list-inside">
              {resumeData.skills.map((skill, index) => (
                <li key={index} className="text-gray-600">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
