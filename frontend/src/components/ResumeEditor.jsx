import { AnimatePresence, motion } from "framer-motion";
import { X, PenSquare, Image as ImageIcon, Plus, Trash2, Download, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Navbar";
import SideButtons from "../components/SideButtons";
import Groq from "groq-sdk";
import { jsPDF } from "jspdf";

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
  const handleGenerateExperience = async () => {
    if (!formData.experience[0]?.company || !formData.experience[0]?.duration || !formData.experience[0]?.jobTitle || !formData.experience[0]?.description) {
      alert("Please enter company, duration, job title, and description first.");
      return;
    }

    setLoadingSummary(true);
    const { company, duration, jobTitle, description } = formData.experience[0]; // Get company, duration, jobTitle, and description from form
    const fetchedExperience = await generateExperience(company, duration, jobTitle, description);

    console.log("Fetched Experience Data:", fetchedExperience);

    // Ensure fetchedExperience is an array and update the state
    if (Array.isArray(fetchedExperience) && fetchedExperience.length > 0) {
      setSummaries(fetchedExperience); // Store experience data in summaries
    } else {
      console.error("Experience data is invalid", fetchedExperience);
    }
    setLoadingSummary(false);
  };

  const generateResumePDF = () => {
    const doc = new jsPDF();
    const marginX = 20;
    const marginY = 20;
    const lineHeight = 8;
    const titleFontSize = 24;
    const sectionFontSize = 16;
    const contentFontSize = 12;
    const maxWidth = 170; // Maximum width to prevent text overflow

    // Set font for title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(titleFontSize);

    let currentY = marginY; // Track vertical position

    // Add profile image if available
    if (mediaPreview) {
      const imageWidth = 40;
      const imageHeight = 40;
      doc.addImage(mediaPreview, "JPEG", marginX, currentY, imageWidth, imageHeight);
    }

    // Calculate name position dynamically based on the image
    const name = formData.name || 'Name';
    const nameWidth = doc.getTextWidth(name);
    const imageWidth = mediaPreview ? 40 : 0; // Only reserve space if image exists
    const nameX = marginX + imageWidth + (mediaPreview ? 10 : 0); // Adjust based on image presence

    // Add name next to the image
    doc.text(name, nameX, currentY + 10);
    currentY += titleFontSize / 2 + 10; // Adjust Y-position after the name

    // Add Personal Information directly below name
    doc.setFontSize(contentFontSize);
    doc.setFont("helvetica", "normal");

    const phone = formData.phone || '(555) 555-5555';
    const email = formData.email || 'email@example.com';
    const address = `${formData.address || '123 Main St, City'} · ${formData.address2 || '456 Another St'}`;

    doc.text(phone, nameX, currentY);
    currentY += lineHeight;
    doc.text(email, nameX, currentY);
    currentY += lineHeight;
    doc.text(address, nameX, currentY);
    currentY += lineHeight * 2; // Extra space before the next section

    // Add Education Section
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Education:", marginX, currentY);
    currentY += lineHeight;

    doc.setFontSize(contentFontSize);
    doc.setFont("helvetica", "normal");

    formData.education.forEach((edu) => {
      doc.text(`${edu.degree} from ${edu.institution}, ${edu.year}`, marginX, currentY);
      currentY += lineHeight;
    });

    currentY += lineHeight; // Space before next section

    // Add Experience Section
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Experience:", marginX, currentY);
    currentY += lineHeight;

    doc.setFontSize(contentFontSize);
    doc.setFont("helvetica", "normal");

    formData.experience.forEach((exp) => {
      doc.text(`${exp.jobTitle} at ${exp.company} (${exp.duration})`, marginX, currentY);
      currentY += lineHeight;

      const descriptionText = exp.description || 'No description available';
      doc.text(descriptionText, marginX, currentY, { maxWidth });

      const descriptionLines = doc.getTextDimensions(descriptionText, { maxWidth }).h / lineHeight;
      currentY += Math.ceil(descriptionLines) * lineHeight; // Adjust for description height
    });

    currentY += lineHeight; // Space before next section

    // Add Skills Section
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Skills:", marginX, currentY);
    currentY += lineHeight;

    doc.setFontSize(contentFontSize);
    doc.setFont("helvetica", "normal");

    formData.skills.forEach((skill) => {
      doc.text(`• ${skill}`, marginX, currentY);
      currentY += lineHeight;
    });

    // Footer for better structure
    doc.setFontSize(10);
    doc.text("Generated by Resume Builder", marginX, currentY);

    // Save the PDF
    doc.save("resume.pdf");
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

  const generateExperience = async (company, duration, jobTitle, description) => {
    try {
      const groq = new Groq({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
      });

      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content:
              'You are an AI assistant that generates a detailed job experience description for resumes. Based on the job title, company, duration, and job description, provide a comprehensive job experience for one experience level: Fresher. The experience level should include the following fields: job_title, company, duration, key_responsibilities, achievements, and skills_required. The output should be in the following JSON format:\n' +
              '{\n' +
              '  "experience": [\n' +
              '    { "experience_level": "Fresher", "job_title": "Job Title", "company": "Company Name", "duration": "Duration", "key_responsibilities": ["Responsibility 1", "Responsibility 2", ...], "achievements": ["Achievement 1", "Achievement 2", ...], "skills_required": ["Skill 1", "Skill 2", ...] }\n' +
              '  ]\n' +
              '}'
          },
          {
            role: "user",
            content: `Company: ${company}\nDuration: ${duration}\nJob Title: ${jobTitle}\nDescription: ${description}`,
          },
        ],
      });

      let aiResponse = response.choices[0]?.message?.content.trim();
      console.log('Raw AI Response:', aiResponse);

      if (aiResponse) {
        let fixedResponse = aiResponse;
        fixedResponse = fixedResponse.replace(/"Cloud computing platforms \(/g, '"Cloud computing platforms"');
        fixedResponse = fixedResponse.replace(/,\s*$/, '');

        const jsonMatch = fixedResponse.match(/\{.*\}/s);

        if (jsonMatch && jsonMatch[0]) {
          const rawJson = jsonMatch[0];
          try {
            const experienceData = JSON.parse(rawJson);
            return experienceData.experience;
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
          }
        } else {
          throw new Error('No valid JSON found in the AI response');
        }
      } else {
        throw new Error('Empty AI response');
      }
    } catch (error) {
      console.error("Error generating experience:", error);
      return [];
    }
  };

  const handleSelectExperience = (experienceDetail) => {
    setFormData({
      ...formData,
      experience: formData.experience.map((exp, index) => {
        if (index === 0) { // Apply the selected experience to the first entry of the experience section
          return {
            ...exp,
            jobTitle: experienceDetail.job_title,
            company: experienceDetail.company,
            duration: experienceDetail.duration,
            description: experienceDetail.description,
          };
        }
        return exp;
      }),
      skills: experienceDetail.skills_required, // Add the skills to the skills section
    });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resume <span className="text-[#6A38C2]">Builder</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a professional resume with AI-powered suggestions and real-time preview
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-2 h-6 bg-[#6A38C2] rounded-full mr-3"></div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange(e, 'name')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e, 'email')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange(e, 'phone')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleChange(e, 'address')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                      placeholder="Your address"
                      rows="2"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Picture */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-2 h-6 bg-[#6A38C2] rounded-full mr-3"></div>
                  Profile Picture
                </h3>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {mediaPreview ? (
                      <img
                        src={mediaPreview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                    />
                    <p className="text-sm text-gray-500 mt-2">Upload a professional photo (JPG, PNG)</p>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-2 h-6 bg-[#6A38C2] rounded-full mr-3"></div>
                  Education
                </h3>
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(e, 'education', index, 'degree')}
                          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="text"
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => handleChange(e, 'education', index, 'institution')}
                          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="text"
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => handleChange(e, 'education', index, 'year')}
                          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => addSectionItem('education')}
                          className="flex items-center px-4 py-2 text-sm text-[#6A38C2] hover:bg-purple-50 rounded-lg transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </button>
                        {formData.education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSectionItem('education', index)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-2 h-6 bg-[#6A38C2] rounded-full mr-3"></div>
                  Experience
                </h3>
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.jobTitle}
                          onChange={(e) => handleChange(e, 'experience', index, 'jobTitle')}
                          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => handleChange(e, 'experience', index, 'company')}
                          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="text"
                          placeholder="Duration"
                          value={exp.duration}
                          onChange={(e) => handleChange(e, 'experience', index, 'duration')}
                          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <textarea
                        placeholder="Job description and responsibilities"
                        value={exp.description}
                        onChange={(e) => handleChange(e, 'experience', index, 'description')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200 mb-4"
                        rows="3"
                      />
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => addSectionItem('experience')}
                          className="flex items-center px-4 py-2 text-sm text-[#6A38C2] hover:bg-purple-50 rounded-lg transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </button>
                        {formData.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSectionItem('experience', index)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <div className="w-2 h-6 bg-[#6A38C2] rounded-full mr-3"></div>
                  Skills
                </h3>
                <div className="space-y-3">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Enter a skill"
                        value={skill}
                        onChange={(e) => handleChange(e, 'skills', index)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => addSectionItem('skills')}
                        className="p-3 text-[#6A38C2] hover:bg-purple-50 rounded-lg transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSectionItem('skills', index)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleGenerateExperience}
                  disabled={loadingSummary}
                  className="w-full py-4 bg-gradient-to-r from-[#6A38C2] to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-[#6A38C2] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{loadingSummary ? 'Generating AI Suggestions...' : 'Generate AI Experience'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={generateResumePDF}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  <span>{loading ? 'Creating Resume...' : 'Download PDF Resume'}</span>
                </motion.button>
              </div>
            </form>

            {/* AI Suggestions */}
            {summaries.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 text-[#6A38C2] mr-2" />
                  AI-Generated Experience Suggestions
                </h3>
                <div className="space-y-4">
                  {summaries.map((suggestion, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-800">{suggestion.experience_level} Level</h4>
                        <p className="text-sm text-gray-600">{suggestion.job_title} at {suggestion.company}</p>
                        <p className="text-sm text-gray-500">{suggestion.duration}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong className="text-gray-700">Key Responsibilities:</strong>
                          <ul className="list-disc list-inside ml-4 text-gray-600">
                            {suggestion.key_responsibilities?.map((resp, idx) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <strong className="text-gray-700">Achievements:</strong>
                          <ul className="list-disc list-inside ml-4 text-gray-600">
                            {suggestion.achievements?.map((ach, idx) => (
                              <li key={idx}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <strong className="text-gray-700">Skills:</strong>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {suggestion.skills_required?.map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-[#6A38C2] text-white text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleSelectExperience({
                          job_title: suggestion.job_title,
                          company: suggestion.company,
                          duration: suggestion.duration,
                          description: suggestion.key_responsibilities?.join(', '),
                          skills_required: suggestion.skills_required,
                        })}
                        className="mt-4 w-full py-2 bg-[#6A38C2] text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        Use This Experience
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-6 bg-[#6A38C2] rounded-full mr-3"></div>
              Resume Preview
            </h3>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              {/* Header */}
              <div className="text-center mb-6 pb-4 border-b border-gray-200">
                {mediaPreview && (
                  <img
                    src={mediaPreview}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                  />
                )}
                <h2 className="text-2xl font-bold text-gray-800">{formData.name || 'Your Name'}</h2>
                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <p>{formData.email || 'your.email@example.com'}</p>
                  <p>{formData.phone || '+1 (555) 123-4567'}</p>
                  <p>{formData.address || 'Your Address'}</p>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Experience</h3>
                <div className="space-y-3">
                  {formData.experience.map((exp, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-800">
                        {exp.jobTitle || 'Job Title'} - {exp.company || 'Company Name'}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">{exp.duration || 'Duration'}</p>
                      <p className="text-sm text-gray-700">{exp.description || 'Job description will appear here.'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Education</h3>
                <div className="space-y-2">
                  {formData.education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-800">
                        {edu.degree || 'Degree'} - {edu.institution || 'Institution'}
                      </h4>
                      <p className="text-sm text-gray-600">{edu.year || 'Year'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#6A38C2] text-white text-sm rounded-full">
                      {skill || 'Skill'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResumeEditor;