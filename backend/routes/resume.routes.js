import express from "express";
import {
  createResume,
  getResumes,
  getResumeById,
  getLatestResume,
  updateResume,
  deleteResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

/**
 * @route POST /api/v1/resumes
 * @desc Create a new resume
 * @access Public
 */
router.post("/", createResume);

/**
 * @route GET /api/v1/resumes
 * @desc Get all resumes
 * @access Public
 */
router.get("/", getResumes);

/**
 * @route GET /api/v1/resumes/latest
 * @desc Get the latest resume
 * @access Public
 */
router.get("/latest", getLatestResume);

/**
 * @route GET /api/v1/resumes/:id
 * @desc Get a specific resume by ID
 * @access Public
 */
router.get("/:id", getResumeById);

/**
 * @route PUT /api/v1/resumes/:id
 * @desc Update a resume by ID
 * @access Public
 */
router.put("/:id", updateResume);

/**
 * @route DELETE /api/v1/resumes/:id
 * @desc Delete a resume by ID
 * @access Public
 */
router.delete("/:id", deleteResume);

export default router;
