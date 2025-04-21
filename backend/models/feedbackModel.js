import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    mentorName: {
      type: String,
      default: "Anonymous Mentor",
    },
    pitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pitch",
      required: true, // Make sure feedback is tied to a pitch
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

feedbackSchema.virtual("formattedDate").get(function () {
  return new Date(this.createdAt).toLocaleString();
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
