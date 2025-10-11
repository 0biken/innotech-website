import Submission from "../models/Submission.js";

export const createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create({ ...req.body, userId: req.user._id });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubmissions = async (req, res) => {
  const submissions = await Submission.find().populate("userId", "name email");
  res.json(submissions);
};
export const getMySubmissions = async (req, res) => {
  const submissions = await Submission.find({ userId: req.user._id });
  res.json(submissions);
}