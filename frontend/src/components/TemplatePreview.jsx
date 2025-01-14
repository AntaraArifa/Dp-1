import React, { useState, useEffect } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
};

const TemplatePreview = ({ selectedTemplate, resumeData }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const SelectedTemplate = templates[selectedTemplate];

  useEffect(() => {
    // Simulate data loading
    if (resumeData && Object.keys(resumeData).length > 0) {
      setIsDataLoaded(true); // Mark data as loaded
    } else {
      setIsDataLoaded(false);
    }
  }, [resumeData]); // Re-run when resumeData changes

  if (!SelectedTemplate || !isDataLoaded) {
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
