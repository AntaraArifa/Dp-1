import Resume from "../models/resume.model.js";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    // Log incoming data for debugging
    console.log("Creating Resume:", req.body);

    // Validate required fields
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    // Save the resume to the database
    const resume = new Resume(req.body);
    await resume.save();

    res.status(201).json({ message: "Resume created successfully", resume });
  } catch (error) {
    console.error("Error creating resume:", error.message);
    res.status(500).json({ message: "Failed to create resume", error: error.message });
  }
};

// Get all resumes
export const getResumes = async (req, res) => {
  try {
    // Fetch all resumes from the database
    const resumes = await Resume.find();

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error.message);
    res.status(500).json({ message: "Failed to fetch resumes", error: error.message });
  }
};

// Get a resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    // Fetch the resume by ID
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume by ID:", error.message);
    res.status(500).json({ message: "Failed to fetch resume", error: error.message });
  }
};

// Update a resume
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    // Update the resume in the database
    const updatedResume = await Resume.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume updated successfully", updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error.message);
    res.status(500).json({ message: "Failed to update resume", error: error.message });
  }
};

// Delete a resume
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid resume ID." });
    }

    // Delete the resume from the database
    const deletedResume = await Resume.findByIdAndDelete(id);

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error.message);
    res.status(500).json({ message: "Failed to delete resume", error: error.message });
  }
};
