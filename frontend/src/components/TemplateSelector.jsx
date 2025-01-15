import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RESUME_API_END_POINT } from './utils/constants';

// Import images
import modernTemplate from "../assets/templates/modern.png";
import classicTemplate from "../assets/templates/classic.png";
import creativeTemplate from "../assets/templates/creative.png";

const templates = [
  {
    id: 1,
    name: "Modern Template",
    description: "A sleek and modern design suitable for most industries.",
    previewImage: modernTemplate,
  },
  {
    id: 2,
    name: "Classic Template",
    description: "A traditional layout perfect for formal job applications.",
    previewImage: classicTemplate,
  },
  {
    id: 3,
    name: "Creative Template",
    description: "An artistic layout for creative roles and portfolios.",
    previewImage: creativeTemplate,
  },
];

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  // Handle template selection
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  // Navigate to preview page for a specific template
  const handlePreviewTemplate = (templateId) => {
    navigate(`/template-preview/${templateId}`);
  };

  // Confirm template selection and navigate to the resume generation page
const handleContinue = () => {
  if (selectedTemplate) {
    navigate(`/resume/templates/${selectedTemplate}`);
  } else {
    alert("Please select a template to continue.");
  }
};

  return (
    <div className="template-selector p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Select a Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer ${
              selectedTemplate === template.id ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {/* Resume-shaped container */}
            <div className="w-full h-65 overflow-hidden flex items-center justify-center mb-4 rounded bg-white"> {/* Adjusted height to fit resume */}
              <img
                src={template.previewImage}
                alt={`${template.name} Preview`}
                className="w-full h-full object-contain" 
              /> {/* Updated to fully fit the resume */}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-4 text-center">{template.description}</p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handlePreviewTemplate(template.id)}
              >
                Preview
              </button>
              <button
                className={`px-4 py-2 rounded transition ${
                  selectedTemplate === template.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {selectedTemplate === template.id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;
