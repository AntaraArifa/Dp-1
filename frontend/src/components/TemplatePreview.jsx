import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector for Redux
import { setResumeData, setError, setLoading } from "../redux/resumeSlice"; // Import actions from resumeSlice
import useGetResumeData from "../hooks/useGetResumeData"; // Corrected import for the custom hook
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

// Mapping of template types to components
const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
};

const TemplatePreview = ({ selectedTemplate, resumeId }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Get the resume data from the Redux store
  const { resumeData, error, loading } = useSelector((state) => state.resume);

  // Fetch resume data using the custom hook
  const { resumeData: fetchedData, error: fetchError, loading: fetchLoading } = useGetResumeData(resumeId);

  // Dynamically select the template component
  const SelectedTemplate = templates[selectedTemplate];

  // Handle loading, error, and data dispatch from the fetched data
  useEffect(() => {
    if (fetchLoading) {
      dispatch(setLoading());
    } else if (fetchError) {
      dispatch(setError(fetchError));
    } else if (fetchedData) {
      dispatch(setResumeData(fetchedData));
    }
  }, [fetchedData, fetchError, fetchLoading, dispatch]);

  // Error state
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  // Loading state
  if (loading || fetchLoading) {
    return <p className="loading-message">Loading resume data...</p>;
  }

  // Resume data not found
  if (!resumeData) {
    return <p className="empty-message">No data available for the selected resume.</p>;
  }

  return (
    <div className="template-preview">
      <h2>Resume Preview</h2>
      {/* PDF Viewer */}
      <PDFViewer style={{ width: "100%", height: "600px" }}>
        <SelectedTemplate data={resumeData} />
      </PDFViewer>

      {/* PDF Download Link */}
      <PDFDownloadLink
        document={<SelectedTemplate data={resumeData} />}
        fileName={`resume_${resumeId}.pdf`}
      >
        {({ loading }) =>
          loading ? "Preparing download..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default TemplatePreview;
