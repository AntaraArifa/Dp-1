import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Preview = () => {
  const location = useLocation(); // To get data passed from other pages (ResumeEditor/TemplateSelector)
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    // Extract resume data passed via state from navigation
    if (location.state && location.state.resumeData) {
      setResumeData(location.state.resumeData);
    } else {
      console.warn("No resume data provided for preview!");
    }
  }, [location.state]);

  // A fallback template in case no specific template is passed
  const defaultTemplate = () => (
    <div className="p-8 border border-gray-300 shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-center mb-4">
        {resumeData?.name || "Your Name"}
      </h1>
      <p className="text-lg text-center text-gray-600 mb-4">
        {resumeData?.title || "Job Title"}
      </p>
      <div className="my-4">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">
          Contact Information
        </h2>
        <p>Email: {resumeData?.email || "your.email@example.com"}</p>
        <p>Phone: {resumeData?.phone || "123-456-7890"}</p>
        <p>Location: {resumeData?.location || "City, Country"}</p>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">Experience</h2>
        <p>
          {resumeData?.experience || "Add your professional experience here."}
        </p>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">Education</h2>
        <p>{resumeData?.education || "Add your education details here."}</p>
      </div>
      <div className="my-4">
        <h2 className="text-xl font-semibold border-b pb-2 mb-2">Skills</h2>
        <p>{resumeData?.skills || "List your skills here."}</p>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Resume Preview
        </h1>

        {/* Display the selected template */}
        {resumeData?.template === "default"
          ? defaultTemplate()
          : defaultTemplate()}

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => window.print()}
          >
            Print Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
