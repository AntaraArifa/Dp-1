import mongoose from 'mongoose';
import axios from 'axios';
import { Job } from './models/job.model.js';  // Update this with the correct path to your Job model

// Function to get embedding from Hugging Face (or another model server)
async function getEmbedding(text) {
    try {
        const response = await axios.post('http://127.0.0.1:5001/api/v1/semantic-search', { query: text });
        
        // Log the raw response to see the structure of the returned embedding
        console.log("Raw API Response:", response.data);

        // Extract and flatten the embedding
        const embedding = response.data.embedding[0]; // Flatten the array by taking the first element
        
        // Return the flattened embedding array
        return embedding;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw new Error("Failed to get embedding");
    }
}

// Function to update all job embeddings
async function updateJobEmbeddings() {
    try {
        // Use the correct MongoDB connection string
        await mongoose.connect('mongodb+srv://antaraarifa:A95mPTOnq0jX8p6C@cluster0.huusk.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Fetch all jobs from the database
        const jobs = await Job.find();  // Fetch all jobs without filtering

        if (jobs.length === 0) {
            console.log("No jobs found in the database.");
            return;
        }

        // Iterate through each job and update its embedding
        for (let job of jobs) {
            const jobText = job.title + " " + job.description;  // Combine title and description
            const embedding = await getEmbedding(jobText);  // Get the embedding using Hugging Face API

            // Make sure embedding is an array of numbers
            if (Array.isArray(embedding) && embedding.every(item => typeof item === 'number')) {
                job.embedding = embedding;  // Update the embedding field
                await job.save();  // Save the updated job with embedding

                console.log(`Updated job: ${job.title}`);
            } else {
                console.log(`Invalid embedding format for job: ${job.title}`);
            }
        }

        console.log("All jobs updated successfully.");
        mongoose.disconnect();  // Disconnect from the database once done

    } catch (error) {
        console.error("Error updating jobs:", error);
    }
}

// Run the update function
updateJobEmbeddings();
