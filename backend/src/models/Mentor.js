import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    bio: { type: String, required: true },
    imageURL: { type: String },
    role: { type: String, enum: ["mentor", "speaker"], default: "mentor" },
    socials: {
      linkedin: { type: String },
      twitter: { type: String },
      github: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true }
);

const Mentor = mongoose.model("Mentor", mentorSchema);
export default Mentor;
