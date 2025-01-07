import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResumeEditor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ jobTitle: "", company: "", duration: "", description: "" }],
    skills: [""],
  });

  const handleChange = (e, section, index = null, field = null) => {
    if (index !== null && field !== null) {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({ ...formData, [section]: e.target.value });
    }
  };

  const addSectionItem = (section) => {
    const newItem =
      section === "education"
        ? { degree: "", institution: "", year: "" }
        : section === "experience"
        ? { jobTitle: "", company: "", duration: "", description: "" }
        : "";
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const removeSectionItem = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSubmit = () => {
    console.log("Resume Data:", formData);
    alert("Resume saved successfully!");
  };

  return (
    <div className="resume-editor bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-300 mb-4"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">Resume Editor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) => handleChange(e, "phone")}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              value={formData.address}
              onChange={(e) => handleChange(e, "address")}
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="section mb-6">
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Degree"
                className="border p-2 mr-2"
                value={edu.degree}
                onChange={(e) => handleChange(e, "education", index, "degree")}
              />
              <input
                type="text"
                placeholder="Institution"
                className="border p-2 mr-2"
                value={edu.institution}
                onChange={(e) =>
                  handleChange(e, "education", index, "institution")
                }
              />
              <input
                type="text"
                placeholder="Year"
                className="border p-2"
                value={edu.year}
                onChange={(e) => handleChange(e, "education", index, "year")}
              />
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-300 ml-2"
                onClick={() => removeSectionItem("education", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
            onClick={() => addSectionItem("education")}
          >
            Add Education
          </button>
        </div>

        <div className="section mb-6">
          <h3 className="text-xl font-semibold mb-4">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Job Title"
                className="border p-2 mr-2"
                value={exp.jobTitle}
                onChange={(e) => handleChange(e, "experience", index, "jobTitle")}
              />
              <input
                type="text"
                placeholder="Company"
                className="border p-2 mr-2"
                value={exp.company}
                onChange={(e) => handleChange(e, "experience", index, "company")}
              />
              <input
                type="text"
                placeholder="Duration"
                className="border p-2 mr-2"
                value={exp.duration}
                onChange={(e) => handleChange(e, "experience", index, "duration")}
              />
              <textarea
                placeholder="Description"
                className="border p-2 w-full"
                value={exp.description}
                onChange={(e) =>
                  handleChange(e, "experience", index, "description")
                }
              ></textarea>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-300 ml-2"
                onClick={() => removeSectionItem("experience", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
            onClick={() => addSectionItem("experience")}
          >
            Add Experience
          </button>
        </div>

        <div className="section mb-6">
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          {formData.skills.map((skill, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Skill"
                className="border p-2 mr-2"
                value={skill}
                onChange={(e) => handleChange(e, "skills", index)}
              />
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-300 ml-2"
                onClick={() => removeSectionItem("skills", index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
            onClick={() => addSectionItem("skills")}
          >
            Add Skill
          </button>
        </div>

        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300 w-full py-3 text-lg"
          onClick={handleSubmit}
        >
          Save Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeEditor;
