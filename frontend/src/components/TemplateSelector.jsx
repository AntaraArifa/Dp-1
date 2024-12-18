import React, { useState } from "react";

const TemplateSelector = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Template",
      description: "A sleek and modern design suitable for most industries.",
      previewImage: "/assets/templates/modern.png",
    },
    {
      id: 2,
      name: "Classic Template",
      description: "A traditional layout perfect for formal job applications.",
      previewImage: "/assets/templates/classic.png",
    },
    {
      id: 3,
      name: "Creative Template",
      description: "An artistic layout for creative roles and portfolios.",
      previewImage: "/assets/templates/creative.png",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    alert(`Template ${templateId} selected!`);
  };

  const handlePreviewTemplate = (templateId) => {
    alert(`Previewing Template ${templateId}`);
  };

  return (
    <div className="template-selector p-8">
      <h2 className="text-2xl font-bold mb-6">Select a Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 ${
              selectedTemplate === template.id ? "border-blue-500" : ""
            }`}
          >
            <img
              src={template.previewImage}
              alt={`${template.name} Preview`}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <p className="text-sm mb-4">{template.description}</p>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={() => handlePreviewTemplate(template.id)}
              >
                Preview
              </button>
              <button
                className={`px-4 py-2 ${
                  selectedTemplate === template.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {selectedTemplate === template.id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
