// assessment.model.js (updated with best practices)
import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job",
    required: true 
  },
  recruiterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  link: { 
    type: String, 
    required: true,
    validate: {
      validator: v => v.startsWith('https://'),
      message: props => `${props.value} is not a valid URL!`
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    immutable: true 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for better query performance
AssessmentSchema.index({ jobId: 1, recruiterId: 1 });

const Assessment = mongoose.model("Assessment", AssessmentSchema);

export default Assessment;