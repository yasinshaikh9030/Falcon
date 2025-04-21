import express from "express";
import Like from "../models/likeModel.js";

const router = express.Router();

router.post("/like/:pitchId", async (req, res) => {
  const { pitchId } = req.params;

  try {
    const like = new Like({ pitch: pitchId });
    await like.save();
    res.status(201).json({ message: "Pitch liked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error liking pitch", error: err });
  }
});

export default router;
