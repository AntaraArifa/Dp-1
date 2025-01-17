import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DynamicTemplatePreview() {
    const { templateId, resumeId } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [templateData, setTemplateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch resume data using resumeId
          const resumeResponse = await axios.get(`/api/resume/${resumeId}`);
          setResumeData(resumeResponse.data.resume);
  
          // Fetch template data using templateId
          const templateResponse = await axios.get(`/api/template/${templateId}`);
          setTemplateData(templateResponse.data.template);
        } catch (err) {
          console.error("Error fetching data:", err.message);
          setError("Failed to fetch resume or template data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [resumeId, templateId]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{templateData?.name} Template</h1>
          {/* Render the resume data dynamically */}
          <div>
            <p><strong>Name:</strong> {resumeData?.name}</p>
            <p><strong>Email:</strong> {resumeData?.email}</p>
            <p><strong>Phone:</strong> {resumeData?.phone}</p>
            <p><strong>Address:</strong> {resumeData?.address}</p>
  
            <h2 className="text-xl font-bold mt-4">Education</h2>
            {resumeData?.education.map((edu, index) => (
              <div key={index}>
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>Year:</strong> {edu.year}</p>
              </div>
            ))}
  
            <h2 className="text-xl font-bold mt-4">Experience</h2>
            {resumeData?.experience.map((exp, index) => (
              <div key={index}>
                <p><strong>Job Title:</strong> {exp.jobTitle}</p>
                <p><strong>Company:</strong> {exp.company}</p>
                <p><strong>Duration:</strong> {exp.duration}</p>
                <p><strong>Description:</strong> {exp.description}</p>
              </div>
            ))}
  
            <h2 className="text-xl font-bold mt-4">Skills</h2>
            <ul>
              {resumeData?.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  