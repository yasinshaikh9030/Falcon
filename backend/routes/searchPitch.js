import express from "express";
import Pitch from "../models/pitchSchema.js";

const router = express.Router();

// GET /api/search?name=something
router.get("/", async (req, res) => {
  try {
    const nameQuery = req.query.name;

    if (!nameQuery) {
      return res.status(400).json({ message: "No search query provided" });
    }

    const matchingPitches = await Pitch.find({
      startupName: { $regex: nameQuery, $options: "i" }, // case-insensitive search
    });

    res.status(200).json(matchingPitches);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
});

export default router;
