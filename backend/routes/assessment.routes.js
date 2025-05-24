// routes/assessments.js
import express from "express";
import Assessment from "../models/assessment.model.js"; // Fixed import
import mongoose from "mongoose";

const router = express.Router();

// Enhanced route with validation and error handling
router.post("/", async (req, res) => {
  try {
    const { jobId, link } = req.body;
    const recruiterId = req.user?.id; // Optional chaining for safety

    // Validation
    if (!jobId || !link) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate jobId format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    // Validate URL format
    try {
      new URL(link); // Will throw if invalid
    } catch (err) {
      return res.status(400).json({ message: "Invalid assessment URL" });
    }

    const assessment = new Assessment({ 
      jobId, 
      link, 
      recruiterId 
    });

    const savedAssessment = await assessment.save();
    
    res.status(201).json({
      success: true,
      data: savedAssessment,
      message: "Assessment created successfully"
    });

  } catch (error) {
    console.error("Assessment creation error:", error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Assessment for this job already exists" 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation failed",
        errors: error.errors 
      });
    }

    res.status(500).json({ 
      message: "Server error while creating assessment",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

export default router;