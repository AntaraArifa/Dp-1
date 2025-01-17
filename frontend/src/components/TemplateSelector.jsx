import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedTemplate } from "../redux/resumeSlice";
import modernTemplate from "../assets/templates/modern.png";
import classicTemplate from "../assets/templates/classic.png";
import creativeTemplate from "../assets/templates/creative.png";

const templates = [
  { id: 1, name: "Modern Template", description: "A sleek and modern design suitable for most industries.", previewImage: modernTemplate },
  { id: 2, name: "Classic Template", description: "A traditional layout perfect for formal job applications.", previewImage: classicTemplate },
  { id: 3, name: "Creative Template", description: "An artistic layout for creative roles and portfolios.", previewImage: creativeTemplate },
];

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplateState] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const resumeId = location.state?.resumeId;

  if (!resumeId) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <p className="text-red-500 font-semibold mb-4">Error: Resume ID is missing.</p>
        <button
          onClick={() => navigate("/resume/edit")}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Go Back to Resume Editor
        </button>
      </div>
    );
  }

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateState(templateId);
    dispatch(setSelectedTemplate(templateId));
  };

  const handleContinue = () => {
    if (!resumeId) {
      alert("Error: Resume ID is missing. Please go back to create a resume.");
      navigate("/resume/edit");
      return;
    }

    if (selectedTemplate) {
      navigate(`/resume/templates/preview/${selectedTemplate}/${resumeId}`);
    } else {
      alert("Please select a template to continue.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Select a Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative bg-white rounded-lg shadow-lg border-2 ${
              selectedTemplate === template.id ? "border-blue-500" : "border-transparent"
            } hover:shadow-xl transition-shadow cursor-pointer`}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <img
              src={template.previewImage}
              alt={template.name}
              className="rounded-t-lg w-full object-cover h-48"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button
                onClick={(e) => e.stopPropagation()}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Preview
              </button>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-0 left-0 w-full h-full bg-blue-500 bg-opacity-10 border-2 border-blue-500 rounded-lg">
                <div className="flex justify-center items-center h-full">
                  <span className="text-blue-500 font-bold text-lg">Selected</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleContinue}
          className="bg-green-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-green-600 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;
