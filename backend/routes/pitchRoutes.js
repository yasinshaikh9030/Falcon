import express from "express";
import Pitch from "../models/pitchSchema.js";

const router = express.Router();

// GET all pitches
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

// ✅ POST a new pitch
router.post("/pitches", async (req, res) => {
  try {
    const newPitch = new Pitch({
      startupName: req.body.startupName,
      startupType: req.body.type,
      pitch: req.body.briefInfo,
      fundingStatus: req.body.fundingStatus,
      valuation: req.body.valuation,
      videoUrl: req.body.videoLink,
      cost: req.body.infrastructureCost,
      location: req.body.location,
      mode: req.body.mode,
    });

    await newPitch.save();
    res.status(201).json({ message: "Pitch created successfully!" });
  } catch (err) {
    console.error("Pitch creation error:", err);
    res
      .status(500)
      .json({ message: "Error creating pitch", error: err.message });
  }
});

export default router;
