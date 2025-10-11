import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true },
    projectTitle: { type: String, required: true },
    pitchDeckURL: { type: String, required: true },
    demoLink: { type: String },
    description: { type: String },
    status: { type: String, enum: ["submitted", "reviewed", "approved", "rejected"], default: "submitted" },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
