import React, { useState, useEffect } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import axios from "axios";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { RESUME_API_END_POINT } from "../utils/constant";



const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
};

const TemplatePreview = ({ selectedTemplate }) => {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const SelectedTemplate = templates[selectedTemplate];

  useEffect(() => {
    const fetchLatestResume = async () => {
      try {
        const response = await axios.get(`${RESUME_API_END_POINT}/latest`);
        setResumeData(response.data);
      } catch (err) {
        console.error("Error fetching the latest resume:", err);
        setError("Failed to load the latest resume.");
      }
    };

    fetchLatestResume();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="template-preview">
      <h2>Preview</h2>
      {/* PDFViewer for live browser preview */}
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <SelectedTemplate data={resumeData} />
      </PDFViewer>
      {/* PDFDownloadLink for downloading the PDF */}
      <PDFDownloadLink
        document={<SelectedTemplate data={resumeData} />}
        fileName="resume.pdf"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default TemplatePreview;
