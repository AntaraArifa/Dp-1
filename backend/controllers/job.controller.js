import { Job } from "../models/job.model.js";
import axios from "axios";

// Function to compute embedding from Hugging Face (or any embedding model)
async function getEmbedding(text) {
    try {
        const response = await axios.post('http://127.0.0.1:5001/api/v1/semantic-search', { query: text });
        return response.data.embedding;  // Return the embedding from Flask API
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw new Error("Failed to get embedding");
    }
}

function cosineSimilarity(a, b) {
    // Check if both vectors have the same length
    if (a.length !== b.length) {
        throw new Error("Vectors must have the same length.");
    }

    // Compute dot product
    const dotProduct = a.reduce((sum, value, index) => sum + value * b[index], 0);
    
    // Compute norms
    const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
    const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));

    // Handle zero vectors
    if (normA === 0 || normB === 0) {
        return 0;  // Return 0 similarity if either vector has zero magnitude
    }

    // Return cosine similarity
    return dotProduct / (normA * normB);
}


// Job creation function with embedding
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Combine title and description to create an embedding
        const jobText = title + " " + description;
        const embedding = await getEmbedding(jobText);  // Get the embedding for the title + description

        // Create the new job and save the embedding
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
            embedding  // Save the embedding to the database
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating job.",
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

// Get jobs posted by the admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
