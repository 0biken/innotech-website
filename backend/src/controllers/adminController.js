import User from "../models/User.js";
import Submission from "../models/Submission.js";
import Registration from "../models/Registration.js";

export const getAdminOverview = async (req, res) => {
  const users = await User.countDocuments();
  const submissions = await Submission.countDocuments();
  const registrations = await Registration.countDocuments();
  res.json({ users, submissions, registrations });
};
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
}