import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },
    date: { type: Date, required: true },
    events: [
      {
        time: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        speaker: { type: String },
        location: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
