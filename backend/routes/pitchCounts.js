import express from "express";
import Pitch from "../models/pitchSchema.js";

const router = express.Router();

// Route to fetch all pitches
router.get("/pitches", async (req, res) => {
  try {
    const allPitches = await Pitch.find();
    res.json(allPitches);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pitches", error: err.message });
  }
});

// Route to fetch pitch stats (likes, feedbacks, views)
router.get("/pitch-stats/:pitchId", async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.pitchId);
    if (!pitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }

    const stats = {
      views: pitch.views || 0,
      feedbacks: pitch.feedbackCount || 0,
      likes: pitch.likes || 0,
    };

    res.json(stats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pitch stats", error: err.message });
  }
});

export default router;
