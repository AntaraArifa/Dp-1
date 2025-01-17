import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DynamicTemplatePreview() {
  const { templateId, resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pdfRef = useRef(null); // Ref for the component to be converted to PDF

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

  const downloadPDF = async () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{templateData?.name} Template</h1>
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Download PDF
        </button>
      </div>
      <div
        ref={pdfRef} // This section will be converted to PDF
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
        <div>
          <p><strong>Name:</strong> {resumeData?.name}</p>
          <p><strong>Email:</strong> {resumeData?.email}</p>
          <p><strong>Phone:</strong> {resumeData?.phone}</p>
          <p><strong>Address:</strong> {resumeData?.address}</p>

          <h3 className="text-lg font-bold mt-4">Education</h3>
          {resumeData?.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Institution:</strong> {edu.institution}</p>
              <p><strong>Year:</strong> {edu.year}</p>
            </div>
          ))}

          <h3 className="text-lg font-bold mt-4">Experience</h3>
          {resumeData?.experience.map((exp, index) => (
            <div key={index} className="mb-2">
              <p><strong>Job Title:</strong> {exp.jobTitle}</p>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Duration:</strong> {exp.duration}</p>
              <p><strong>Description:</strong> {exp.description}</p>
            </div>
          ))}

          <h3 className="text-lg font-bold mt-4">Skills</h3>
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
