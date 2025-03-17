import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";  // Your DB connection function
import jobRoute from "./routes/job.route.js";  // The job route handling the search and post requests

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware for logging incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// CORS configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"], // Add your frontend URL here
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions)); // Apply the CORS configuration  

// Routes
app.use("/api/v1/job", jobRoute);  // Use the job route for the job-related actions

// Server and Database Initialization
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        // Connect to the database
        await connectDB();
        console.log("Database connection established successfully.");

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error.message);
        process.exit(1); // Exit the process on failure
    }
};

// Start the server
startServer();
