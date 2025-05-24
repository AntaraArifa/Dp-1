// controllers/assessment.controller.js
import Assessment from "../models/assessment.model"; // Make sure casing matches file name exactly

// Create a new assessment (POST /api/assessments)
export const createAssessment = async (req, res) => {
  try {
    const { jobId, link } = req.body;

    if (!jobId || !link) {
      return res.status(400).json({ message: "jobId and link are required" });
    }

    const newAssessment = new Assessment({
      jobId,
      link,
      recruiterId: req.user.id, // Assumes auth middleware sets req.user
    });

    const savedAssessment = await newAssessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    console.error("Error creating assessment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all assessments for a job (GET /api/assessments/job/:jobId)
export const getAssessmentsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const assessments = await Assessment.find({ jobId });
    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all assessments for a recruiter (GET /api/assessments/recruiter)
export const getAssessmentsByRecruiter = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const assessments = await Assessment.find({ recruiterId });
    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching recruiter assessments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
