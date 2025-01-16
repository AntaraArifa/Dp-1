import React, { useState, useEffect } from "react";
import { useGetResumeData } from "../hooks/useGetResumeData";  // Adjusted hook import
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
};

const TemplatePreview = ({ selectedTemplate, resumeId }) => {  // Pass resumeId here
  const { data, error } = useGetResumeData(resumeId);  // Fetch data based on the passed ID
  const SelectedTemplate = templates[selectedTemplate];

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="template-preview">
      <h2>Preview</h2>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <SelectedTemplate data={data} />
      </PDFViewer>
      <PDFDownloadLink document={<SelectedTemplate data={data} />} fileName="resume.pdf">
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default TemplatePreview;
