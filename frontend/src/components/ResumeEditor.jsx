import React, { useState } from "react";

const ResumeEditor = () => {
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
    <div className="resume-editor p-8">
      <h2 className="text-2xl font-bold mb-6">Resume Editor</h2>
      <div className="section mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
        />
      </div>
      <div className="section mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="border p-2 w-full"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
        />
      </div>
      <div className="section mb-4">
        <label className="block mb-2">Phone</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={formData.phone}
          onChange={(e) => handleChange(e, "phone")}
        />
      </div>
      <div className="section mb-4">
        <label className="block mb-2">Address</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={formData.address}
          onChange={(e) => handleChange(e, "address")}
        />
      </div>

      {/* Education Section */}
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
              className="bg-red-500 text-white p-2 ml-2"
              onClick={() => removeSectionItem("education", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => addSectionItem("education")}
        >
          Add Education
        </button>
      </div>

      {/* Experience Section */}
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
              className="bg-red-500 text-white p-2 ml-2"
              onClick={() => removeSectionItem("experience", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => addSectionItem("experience")}
        >
          Add Experience
        </button>
      </div>

      {/* Skills Section */}
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
              className="bg-red-500 text-white p-2 ml-2"
              onClick={() => removeSectionItem("skills", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => addSectionItem("skills")}
        >
          Add Skill
        </button>
      </div>

      <button
        className="bg-green-500 text-white p-4 mt-6"
        onClick={handleSubmit}
      >
        Save Resume
      </button>
    </div>
  );
};

export default ResumeEditor;
