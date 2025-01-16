import Resume from "../models/resume.model.js";
import mongoose from "mongoose";
import validator from "validator";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    console.log("Creating Resume Request Received");

    const { name, email, phone, address, education, experience, skills } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !education || !experience || !skills) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Additional input validations
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10-15 digits long." });
    }

    if (!Array.isArray(education) || !Array.isArray(experience) || !Array.isArray(skills)) {
      return res.status(400).json({ message: "Education, experience, and skills must be arrays." });
    }

    // Save the resume to the database
    const resumeData = { name, email, phone, address, education, experience, skills };
    const resume = new Resume(resumeData);
    await resume.save();

    return res.status(201).json({ message: "Resume created successfully", resume });
  } catch (error) {
    console.error("Error creating resume:", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch all resumes
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    return res.status(200).json({ message: "Resumes retrieved successfully", resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch a resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    return res.status(200).json({ message: "Resume retrieved successfully", resume });
  } catch (error) {
    console.error("Error fetching resume:", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch the latest resume (assuming latest is the most recently created one)
export const getLatestResume = async (req, res) => {
  try {
    const latestResume = await Resume.findOne().sort({ createdAt: -1 }); // Sorting by creation date descending

    if (!latestResume) {
      return res.status(404).json({ message: "No resumes found." });
    }

    return res.status(200).json({ message: "Latest resume retrieved successfully", latestResume });
  } catch (error) {
    console.error("Error fetching latest resume:", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a resume by ID
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, education, experience, skills } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { name, email, phone, address, education, experience, skills },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    return res.status(200).json({ message: "Resume updated successfully", updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete a resume by ID
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    const deletedResume = await Resume.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found." });
    }

    return res.status(200).json({ message: "Resume deleted successfully", deletedResume });
  } catch (error) {
    console.error("Error deleting resume:", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
