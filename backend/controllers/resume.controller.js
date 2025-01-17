import Resume from "../models/resume.model.js";
import mongoose from "mongoose";
import validator from "validator";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    console.log("Creating Resume Request Received");
    console.log("Request Body:", req.body); // Log the incoming data from the frontend

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

    console.log("Resume created with ID:", resume._id); // Log the ID of the newly created resume

    return res.status(201).json({ message: "Resume created successfully", resume });
  } catch (error) {
    console.error("Error creating resume:", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch all resumes
export const getResumes = async (req, res) => {
  try {
    console.log("Fetching all resumes. Request received.");
    console.log("Request Params:", req.params); // Log the incoming params if any
    console.log("Request Query:", req.query); // Log the query if there are any query params

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
    console.log("[INFO] Received request to fetch resume by ID");

    const { id } = req.params;
    console.log("[DEBUG] Requested Resume ID:", id);

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("[ERROR] Invalid resume ID format:", id);
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    console.log("[INFO] Resume ID is valid. Proceeding to fetch from database.");

    // Query the database for the resume with the given ObjectId
    const resume = await Resume.findById(id);

    if (!resume) {
      console.log("[WARN] No resume found for ID:", id);
      return res.status(404).json({ message: "Resume not found." });
    }

    console.log("[SUCCESS] Resume found for ID:", id);
    console.log("[DEBUG] Resume Data:", JSON.stringify(resume, null, 2));

    // Return the resume if it is found
    return res.status(200).json({ message: "Resume retrieved successfully", resume });
  } catch (error) {
    console.error("[ERROR] An error occurred while fetching the resume:");
    console.error("[ERROR DETAILS]", error.stack);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch the latest resume (assuming latest is the most recently created one)
export const getLatestResume = async (req, res) => {
  try {
    console.log("Fetching the latest resume. Request received.");

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
    console.log("Updating resume. Request received.");
    console.log("Request Params:", req.params); // Log the incoming params if any
    console.log("Request Body:", req.body); // Log the incoming data from the frontend

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

    console.log("Deleting resume. Request received.");
    console.log("Requested Resume ID:", id); // Log the ID parameter

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
