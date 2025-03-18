import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import chatRoute from "./routes/chat.route.js";
import resumeRoute from "./routes/resume.routes.js";
import notificationRoutes from "./routes/notification.route.js"

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

// Define allowed origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("CORS policy does not allow access from this origin"));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Apply the CORS middleware
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/resumes", resumeRoute);
app.use("/api/v1/notification",notificationRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

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
