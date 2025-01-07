import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String, required: true },
    },
  ],
  experience: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      duration: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  skills: [{ type: String, required: true }],
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
