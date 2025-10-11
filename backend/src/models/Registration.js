import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      enum: ["hackathon", "accelerator", "mentorship", "attendee"],
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    teamName: { type: String },
    institution: { type: String },
    phone: { type: String },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
