import express from "express";
import Feedback from "../models/feedbackModel.js";
import Pitch from "../models/pitchSchema.js";

const router = express.Router();

// Route for submitting feedback for a specific pitch
router.post("/feedback/:pitchId", async (req, res) => {
  const { text } = req.body;
  const { pitchId } = req.params;

  try {
    const feedback = new Feedback({ text, pitch: pitchId });
    await feedback.save();

    // Increment the feedback count for the pitch
    await Pitch.findByIdAndUpdate(pitchId, { $inc: { feedbackCount: 1 } });

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback", error: err });
  }
});

// Route for fetching feedback for a specific pitch
router.get("/feedback/:pitchId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ pitch: req.params.pitchId });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks", error: err });
  }
});

export default router;
