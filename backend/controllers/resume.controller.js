import Resume from "../models/resume.model.js";
import mongoose from "mongoose";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    console.log("Creating Resume:", req.body);

    // Validate required fields
    const { name, email, phone, address, education, experience, skills } = req.body;
    if (!name || !email || !phone || !address || !education || !experience || !skills) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Save the resume to the database
    const resume = new Resume(req.body);
    await resume.save();

    res.status(201).json({ message: "Resume created successfully", resume });
  } catch (error) {
    console.error("Error creating resume:", error.stack);
    res.status(500).json({ message: "Failed to create resume", error: error.message });
  }
};

// Get all resumes
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error.stack);
    res.status(500).json({ message: "Failed to fetch resumes", error: error.message });
  }
};

// Get the latest resume
export const getLatestResume = async (req, res) => {
  try {
    const latestResume = await Resume.findOne().sort({ createdAt: -1 });
    if (!latestResume) {
      return res.status(404).json({ message: "No resumes found" });
    }
    res.status(200).json(latestResume);
  } catch (error) {
    console.error("Error fetching the latest resume:", error);
    res.status(500).json({ message: "Failed to fetch the latest resume", error: error.message });
  }
};

// Get a resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume by ID:", error.stack);
    res.status(500).json({ message: "Failed to fetch resume", error: error.message });
  }
};

// Update a resume
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    const updatedResume = await Resume.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume updated successfully", updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error.stack);
    res.status(500).json({ message: "Failed to update resume", error: error.message });
  }
};

// Delete a resume
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    const deletedResume = await Resume.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error.stack);
    res.status(500).json({ message: "Failed to delete resume", error: error.message });
  }
};
