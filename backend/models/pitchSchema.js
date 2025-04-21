import mongoose from "mongoose";

const pitchSchema = new mongoose.Schema(
  {
    startupName: { type: String, required: true },
    startupType: { type: String, required: true }, // 🛠️ Changed from `type` to `startupType` (matches POST logic)
    pitch: { type: String, required: true }, // 🛠️ This holds `briefInfo` from form
    fundingStatus: { type: String, required: true }, // ✅ Newly added field
    valuation: { type: Number }, // ✅ Added (only required in some cases)
    videoUrl: { type: String }, // 🛠️ Updated naming for consistency
    cost: { type: Number, required: true }, // 🛠️ Changed from String ➜ Number (makes more sense for "Ask")
    location: { type: String, required: true },
    mode: { type: String, enum: ["Online", "Offline"], required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    feedbackCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Pitch = mongoose.model("Pitch", pitchSchema);

export default Pitch;
