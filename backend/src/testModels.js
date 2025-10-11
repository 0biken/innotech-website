import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Registration from "./models/Registration.js";
import Submission from "./models/Submission.js";

dotenv.config();

const runTests = async () => {
  try {
    await connectDB();

    console.log("⚙️ Starting Model Tests...");

    // 1️⃣ Create User
    const user = new User({
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "student",
    });
    await user.save();
    console.log("✅ User saved:", user.fullName);

    // 2️⃣ Create Registration
    const registration = new Registration({
      program: "hackathon",
      user: user._id,
      teamName: "The Innovators",
      institution: "University of Ibadan",
      phone: "08012345678",
    });
    await registration.save();
    console.log("✅ Registration saved:", registration.program);

    // 3️⃣ Create Submission
    const submission = new Submission({
      team: registration._id,
      projectTitle: "Smart Waste Management",
      pitchDeckURL: "https://example.com/pitchdeck.pdf",
      demoLink: "https://youtu.be/demo",
      description: "AI-driven waste sorting solution.",
    });
    await submission.save();
    console.log("✅ Submission saved:", submission.projectTitle);

    console.log("🎉 All model tests passed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed.");
  }
};

runTests();
