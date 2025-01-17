import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RESUME_API_END_POINT } from "../utils/constant";

const ResumeEditor = () => {
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ jobTitle: "", company: "", duration: "", description: "" }],
    skills: [""],
  });

  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e, section, index = null, field = null) => {
    if (section === "skills" && index !== null) {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = e.target.value;
      setFormData({ ...formData, skills: updatedSkills });
    } else if (index !== null && field !== null) {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [section]: e.target.value });
    }
  };

  // Add a new item to a section
  const addSectionItem = (section) => {
    const newItem =
      section === "education"
        ? { degree: "", institution: "", year: "" }
        : section === "experience"
        ? { jobTitle: "", company: "", duration: "", description: "" }
        : section === "skills"
        ? ""
        : null;

    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  // Remove an item from a section
  const removeSectionItem = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${RESUME_API_END_POINT}`, formData);
      const { resume } = response.data;

      if (resume && resume._id) {
        console.log("Resume Created with ID:", resume._id);
        // Navigate to Template Selector with resumeId
        navigate(`/resume/templates`, { state: { resumeId: resume._id } });
      } else {
        console.error("Unexpected response format. Resume ID missing.");
        alert("Failed to create resume. Please try again.");
      }
    } catch (error) {
      console.error("Error creating resume:", error.message);
      alert("An error occurred while creating the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-editor bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Resume Builder</h2>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              className="border rounded-lg p-3 w-full"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
              className="border rounded-lg p-3 w-full"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange(e, "phone")}
              className="border rounded-lg p-3 w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange(e, "address")}
              className="border rounded-lg p-3 w-full"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleChange(e, "education", index, "degree")}
                className="border rounded-lg p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleChange(e, "education", index, "institution")}
                className="border rounded-lg p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleChange(e, "education", index, "year")}
                className="border rounded-lg p-2"
              />
              <button
                onClick={() => removeSectionItem("education", index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => addSectionItem("education")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Education
          </button>
        </div>

        {/* Experience Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => handleChange(e, "experience", index, "jobTitle")}
                className="border rounded-lg p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleChange(e, "experience", index, "company")}
                className="border rounded-lg p-2 mr-2"
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleChange(e, "experience", index, "duration")}
                className="border rounded-lg p-2"
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleChange(e, "experience", index, "description")}
                className="border rounded-lg p-2 w-full"
              />
              <button
                onClick={() => removeSectionItem("experience", index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => addSectionItem("experience")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Experience
          </button>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleChange(e, "skills", index)}
                className="border rounded-lg p-2 w-full"
              />
              <button
                onClick={() => removeSectionItem("skills", index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => addSectionItem("skills")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } text-white px-6 py-3 rounded-lg w-full text-lg`}
        >
          {loading ? "Creating Resume..." : "Create Resume"}
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;
