import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import { PDFDownloadLink } from "@react-pdf/renderer";

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
};

const TemplatePreview = ({ selectedTemplate, resumeData }) => {
  const SelectedTemplate = templates[selectedTemplate];

  if (!SelectedTemplate || !resumeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="template-preview">
      <h2>Preview</h2>
      <SelectedTemplate data={resumeData} />
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
