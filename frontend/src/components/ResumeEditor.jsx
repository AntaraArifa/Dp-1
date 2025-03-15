import { AnimatePresence, motion } from "framer-motion";
import { X, PenSquare, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Navbar";
import SideButtons from "../components/SideButtons";
import Groq from "groq-sdk";
// ResumeEditor Component
function ResumeEditor() {
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
  const [mediaPreview, setMediaPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [summaries, setSummaries] = useState([]); // State to store summaries
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Handle the Generate Summary button click
  const handleGenerateSummary = async () => {
    if (!formData.experience[0]?.jobTitle) {
      alert("Please enter a job title first.");
      return;
    }

    setLoadingSummary(true);
    const jobTitle = formData.experience[0]?.jobTitle; // Get job title from form
    const fetchedSummaries = await generateSummary(jobTitle);
    setSummaries(fetchedSummaries);
    setLoadingSummary(false);
  };
  // Handle changes in form input
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

  // Add new item to a section (education, experience, skills)
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

  // Handle file changes (for profile or other media)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle submission (API request or other actions)
    // After submission, reset the form or display success
    setLoading(false);
  };


  const generateSummary = async (jobTitle) => {
    try {
      const groq = new Groq({
        apiKey: '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', // Directly use your API key here
        dangerouslyAllowBrowser: true,
      });

      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 200,
        messages: [
          {
            role: "system",
            content:
              'You are an AI assistant that generates professional summaries for resumes. Based on the job title, provide a summary for 3 experience levels: Freshers, Mid-level, and Senior. Output should be in this format:\n' +
              '{\n  "summaries": [\n    { "experience_level": "Fresher", "summary": "Summary for fresher" },\n    { "experience_level": "Mid Level", "summary": "Summary for mid-level" },\n    { "experience_level": "Senior", "summary": "Summary for senior" }\n  ]\n}',
          },
          {
            role: "user",
            content: `Job Title: ${jobTitle}`,
          },
        ],
      });

      let aiResponse = response.choices[0]?.message?.content.trim();

      // Log the raw response string before parsing
      console.log('Raw AI Response:', aiResponse);

      // Check if the response is incomplete (ends abruptly)
      if (aiResponse) {
        // Check if the string ends with an incomplete "Senior" summary (you can adjust based on your needs)
        if (aiResponse.includes('Senior', aiResponse.length - 6) && !aiResponse.endsWith('"')) {
          aiResponse += '"';  // Add the closing quote if it's missing
        }

        try {
          const parsedResponse = JSON.parse(aiResponse); // Attempt to parse the response
          const summaries = parsedResponse.summaries; // Extract summaries from the parsed response
          return summaries;
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          console.error("Invalid JSON:", aiResponse); // Log the invalid JSON to help identify the issue
          return [];
        }
      } else {
        throw new Error('Empty AI response');
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      return [];
    }
  };

  const handleSelectSummary = (summary) => {
    setSelectedSummary(summary);  // Set the selected summary

    // Optionally, you can add the selected summary to a specific part of your formData.
    // For example, if you want to add it to the experience description or a "summary" section:
    setFormData({
      ...formData,
      experience: formData.experience.map((exp, index) => {
        // Optionally apply this to a particular job experience or create a new field for the summary
        if (index === 0) { // assuming you want to add it to the first experience entry
          return { ...exp, description: summary }; // Add summary to the first experience's description
        }
        return exp;
      }),
    });
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Navbar */}
      <Header />

      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          {/* Resume Form Section */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Resume Builder</h2>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                    className="bg-red-500 text-white text-xs px-4 py-2 rounded ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSectionItem("skills")}
                className="bg-black text-white text-sm px-4 py-2 rounded"
              >
                Add Skill
              </button>
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
                    className="bg-red-500 text-white text-xs px-4 py-2 rounded ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSectionItem("education")}
                className="bg-black text-white text-sm px-4 py-2 rounded"
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
                    className="bg-red-500 text-white text-xs px-4 py-2 rounded ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSectionItem("experience")}
                className="bg-black text-white text-sm px-4 py-2 rounded"
              >
                Add Experience
              </button>
            </div>


            {/* Media Upload (Profile Image or other media) */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border rounded-lg p-3 w-full"
              />
              {mediaPreview && (
                <img
                  src={mediaPreview}
                  alt="Profile Preview"
                  className="mt-4 w-32 h-32 rounded-full object-cover"
                />
              )}
            </div>

            {/* Generate Summary Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleGenerateSummary}
              className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loadingSummary ? "Generating..." : "Generate Summary"}
            </motion.button>


            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
            >
              <PenSquare className="w-5 h-5" />
              {loading ? "Saving..." : "Create Resume"}
            </motion.button>
          </form>
        </div>

        {/* Display Summaries Below the Form */}
        {summaries.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Suggested Summaries</h3>
            <ul>
              {summaries.map((summary, index) => (
                <li key={index} className="mb-4">
                  <div>
                    <strong>{summary.experience_level} Summary:</strong>
                    <p>{summary.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}


        {/* Preview Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          {/* Resume Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold text-gray-800">{formData.name || "Name"}</h3>
            <div className="mt-2 text-lg text-gray-600">
              <p>{formData.email || "email@example.com"}</p>
              <p>{formData.phone || "(555) 555-5555"}</p>
              <p>{formData.address || "123 Main St, City, Country"}</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700">Experience</h4>
            <div className="space-y-4 mt-2">
              {formData.experience.map((exp, index) => (
                <div key={index} className="border-b pb-4">
                  <h5 className="text-lg font-semibold text-gray-800">{exp.jobTitle || "Job Title"} at {exp.company || "Company Name"}</h5>
                  <p className="text-sm text-gray-600">{exp.duration || "January 2020 - Present"}</p>
                  <p className="mt-2 text-gray-700">{exp.description || "Job description goes here."}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700">Education</h4>
            <div className="space-y-4 mt-2">
              {formData.education.map((edu, index) => (
                <div key={index} className="border-b pb-4">
                  <h5 className="text-lg font-semibold text-gray-800">{edu.degree || "Degree"} from {edu.institution || "Institution Name"}</h5>
                  <p className="text-sm text-gray-600">{edu.year || "Graduation Year"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700">Skills</h4>
            <div className="mt-2 flex flex-wrap gap-3">
              {formData.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm">
                  {skill || "Skill"}
                </span>
              ))}
            </div>
          </div>

          {/* Profile Picture Section */}
          {mediaPreview && (
            <div className="flex justify-center mt-6">
              <img
                src={mediaPreview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            </div>
          )}
        </div>



      </div>
    </div>
  );
}

export default ResumeEditor;
