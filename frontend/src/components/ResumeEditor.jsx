import { AnimatePresence, motion } from "framer-motion";
import { X, PenSquare, Image as ImageIcon } from "lucide-react";
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
                  onChange={(e) => handleChange(e, 'name')}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, 'email')}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange(e, 'phone')}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleChange(e, 'address')}
                  className="border rounded-lg p-3 w-full"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-700">Skills</h4>
              <div className="mt-2 flex flex-wrap gap-3">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm">
                    {skill || 'Skill'}
                  </span>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(e, 'education', index, 'degree')}
                      className="border rounded-lg p-2 flex-grow"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleChange(e, 'education', index, 'institution')}
                      className="border rounded-lg p-2 flex-grow"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleChange(e, 'education', index, 'year')}
                      className="border rounded-lg p-2"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => addSectionItem('education')}
                      className="bg-black text-white text-sm px-4 py-2 rounded"
                    >
                      Add Education
                    </button>
                    <button
                      onClick={() => removeSectionItem('education', index)}
                      className="bg-red-500 text-white text-sm px-4 py-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>



            {/* Experience Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) => handleChange(e, 'experience', index, 'jobTitle')}
                      className="border rounded-lg p-2 flex-grow"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleChange(e, 'experience', index, 'company')}
                      className="border rounded-lg p-2 flex-grow"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => handleChange(e, 'experience', index, 'duration')}
                      className="border rounded-lg p-2"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleChange(e, 'experience', index, 'description')}
                    className="border rounded-lg p-2 w-full mt-2"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => addSectionItem('experience')}
                      className="bg-black text-white text-sm px-4 py-2 rounded"
                    >
                      Add Experience
                    </button>
                    <button
                      onClick={() => removeSectionItem('experience', index)}
                      className="bg-red-500 text-white text-sm px-4 py-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
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
              onClick={handleGenerateExperience}
              className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
            >
              {loadingSummary ? 'Generating...' : 'Generate Experience Details'}
            </motion.button>

            {/* Add a margin to the bottom of the Generate Experience button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={generateResumePDF} // Trigger the PDF generation
              className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2 mt-2" // Add `mt-2` to create a small gap
            >
              <PenSquare className="w-5 h-5" />
              {loading ? 'Saving...' : 'Create Resume'}
            </motion.button>

            {/* Display Summaries Below the Form */}
            {summaries.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Suggested Experience Details</h3>
                <ul>
                  {summaries.map(
                    (
                      { experience_level, job_title, company, duration, key_responsibilities = [], achievements = [], skills_required = [] },
                      index
                    ) => (
                      <li key={index} className="mb-4">
                        <div>
                          <strong>{experience_level} Experience:</strong>
                          <p><strong>Job Title:</strong> {job_title}</p>
                          <p><strong>Company:</strong> {company}</p>
                          <p><strong>Duration:</strong> {duration}</p>
                          <div>
                            <strong>Key Responsibilities:</strong>
                            <ul>
                              {key_responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Achievements:</strong>
                            <ul>
                              {achievements.map((ach, idx) => (
                                <li key={idx}>{ach}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Skills Required:</strong>
                            <ul>
                              {skills_required.map((skill, idx) => (
                                <li key={idx}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={() =>
                              handleSelectExperience({
                                job_title,
                                company,
                                duration,
                                description: key_responsibilities.join(', '),
                                skills_required,
                              })
                            }
                            className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-xl"
                          >
                            Select Experience
                          </button>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          {/* Resume Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold text-gray-800">{formData.name || 'Name'}</h3>
            <div className="mt-2 text-lg text-gray-600">
              <p>{formData.email || 'email@example.com'}</p>
              <p>{formData.phone || '(555) 555-5555'}</p>
              <p>{formData.address || '123 Main St, City, Country'}</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700">Experience</h4>
            <div className="space-y-4 mt-2">
              {formData.experience.map((exp, index) => (
                <div key={index} className="border-b pb-4">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {exp.jobTitle || 'Job Title'} at {exp.company || 'Company Name'}
                  </h5>
                  <p className="text-sm text-gray-600">{exp.duration || 'January 2020 - Present'}</p>
                  <p className="mt-2 text-gray-700">{exp.description || 'Job description goes here.'}</p>
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
                  <h5 className="text-lg font-semibold text-gray-800">
                    {edu.degree || 'Degree'} from {edu.institution || 'Institution Name'}
                  </h5>
                  <p className="text-sm text-gray-600">{edu.year || 'Graduation Year'}</p>
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
                  {skill || 'Skill'}
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
};

export default ResumeEditor;