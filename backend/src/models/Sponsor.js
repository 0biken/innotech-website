import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logoURL: { type: String, required: true },
    tier: {
      type: String,
      enum: ["platinum", "gold", "silver", "bronze"],
      default: "bronze"
    },
    website: { type: String },
  },
  { timestamps: true }
);

const Sponsor = mongoose.model("Sponsor", sponsorSchema);
export default Sponsor;
