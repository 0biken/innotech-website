import Registration from "../models/Registration.js";

export const createRegistration = async (req, res) => {
  try {
    const registration = await Registration.create({ ...req.body, userId: req.user._id });
    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllRegistrations = async (req, res) => {
  const registrations = await Registration.find().populate("userId", "name email");
  res.json(registrations);
};
