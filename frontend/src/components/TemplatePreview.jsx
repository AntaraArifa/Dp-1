import React from "react";
import { useParams } from "react-router-dom";

const TemplatePreview = () => {
  const { id } = useParams(); // Get the template ID from the route parameters

  return (
    <div className="template-preview p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Template Preview</h2>
      <p className="text-center text-lg">Previewing template ID: {id}</p>
      {/* Add actual preview logic here */}
      <div className="template-content mt-6">
        <p className="text-center text-gray-600">Template {id} content goes here.</p>
      </div>
    </div>
  );
};

export default TemplatePreview;
