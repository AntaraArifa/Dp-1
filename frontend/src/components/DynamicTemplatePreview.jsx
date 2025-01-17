// DynamcTemplatePreview

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetResumeById from "@/hooks/useGetResumeById";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DynamicTemplatePreview() {
  const { templateId, resumeId } = useParams();
  const [templateData, setTemplateData] = useState(null);
  const { singleResume: resumeData } = useSelector((state) => state.resume); // Access resume data from Redux

  // Fetch resume data using the custom hook
  useGetResumeById(resumeId);

  //Fetch template details dynamically
  // useEffect(() => {
  //   const fetchTemplateData = async () => {
  //     try {
  //       const response = await axios.get(/api/templates/${templateId}); // Update endpoint as needed
  //       setTemplateData(response.data.template);
  //     } catch (error) {
  //       console.error("Error fetching template data:", error);
  //     }
  //   };

  //   fetchTemplateData();
  // }, [templateId]);

  const downloadPDF = async () => {
    const pdfElement = document.getElementById("resume-preview");
  
    if (!pdfElement) {
      console.error("Resume element not found!");
      return;
    }
  
    try {
      // Temporarily make the resume-preview div visible
      pdfElement.style.display = "block";
  
      // Ensure content has loaded fully
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for content to fully load
  
      // Get the width and height of the element to ensure it's captured correctly
      const elementWidth = pdfElement.offsetWidth;
      const elementHeight = pdfElement.offsetHeight;
  
      console.log("Element Dimensions: ", elementWidth, elementHeight); // Debugging dimensions
  
      // Capture the resume preview as a canvas with fixed width and height
      const canvas = await html2canvas(pdfElement, {
        scale: 2, // Increase quality
        useCORS: true, // Enable cross-origin loading for images
        backgroundColor: "#ffffff", // Ensure background is white
        width: elementWidth, // Set the width to match the element's width
        height: elementHeight, // Set the height to match the element's height
        logging: true, // Enable logging for debugging
        allowTaint: true, // Allow tainting of the canvas for cross-origin content
      });
  
      // Get the image data from the canvas
      const imgData = canvas.toDataURL("image/png");
  
      // Initialize jsPDF with A4 page size
      const pdf = new jsPDF("p", "mm", "a4");
  
      // Calculate dimensions for the PDF to fit content
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      // Adjust the image dimensions based on the aspect ratio
      const aspectRatio = canvas.width / canvas.height;
      const pdfHeightAdjusted = pdfWidth / aspectRatio;
  
      // Add the image to the PDF and ensure it fits properly on A4 size
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeightAdjusted);
  
      // Save the PDF
      pdf.save("resume.pdf");
  
      // After saving, hide the resume-preview div again
      pdfElement.style.display = "none";
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  console.log("ResumeData:", resumeData);

  if (!resumeData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 p-8 font-sans text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">{resumeData.name} Template</h1>
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        >
          Download PDF
        </button>
      </div>
      <div
        id="resume-preview"
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Resume Preview</h2>
        <div>
          <p className="text-lg mb-2"><strong className="text-gray-800">Name:</strong> {resumeData.name}</p>
          <p className="text-lg mb-2"><strong className="text-gray-800">Email:</strong> {resumeData.email}</p>
          <p className="text-lg mb-2"><strong className="text-gray-800">Phone:</strong> {resumeData.phone}</p>
          <p className="text-lg mb-2"><strong className="text-gray-800">Address:</strong> {resumeData.address}</p>

          <h3 className="text-xl font-semibold text-blue-500 mt-6 mb-4">Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg"><strong>Degree:</strong> {edu.degree}</p>
              <p className="text-lg"><strong>Institution:</strong> {edu.institution}</p>
              <p className="text-lg"><strong>Year:</strong> {edu.year}</p>
            </div>
          ))}

          <h3 className="text-xl font-semibold text-blue-500 mt-6 mb-4">Experience</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg"><strong>Job Title:</strong> {exp.jobTitle}</p>
              <p className="text-lg"><strong>Company:</strong> {exp.company}</p>
              <p className="text-lg"><strong>Duration:</strong> {exp.duration}</p>
              <p className="text-lg"><strong>Description:</strong> {exp.description}</p>
            </div>
          ))}

          <h3 className="text-xl font-semibold text-blue-500 mt-6 mb-4">Skills</h3>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}