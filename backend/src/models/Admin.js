import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    permissions: {
      manageRegistrations: { type: Boolean, default: true },
      manageSubmissions: { type: Boolean, default: true },
      manageSponsors: { type: Boolean, default: true },
      manageSchedule: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
