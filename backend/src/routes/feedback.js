import express from "express";
import Feedback from "../models/Feedback.js";
import { authMiddleware } from "../middleware/auth.js"; // ✅ verify user

const router = express.Router();

/**
 * @route   GET /api/feedback
 * @desc    Get all feedbacks (anyone can view)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks); // always return an array
  } catch (err) {
    console.error("❌ Fetch feedbacks error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route   POST /api/feedback
 * @desc    Add new feedback (only logged-in users)
 * @access  Private
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message, rating } = req.body;

    if (!message || !rating) {
      return res.status(400).json({ error: "Message and rating are required" });
    }

    const newFeedback = new Feedback({
      user: req.user.id,
      message,
      rating,
    });

    await newFeedback.save();

    // ✅ Populate so frontend has name/email
    const savedFeedback = await newFeedback.populate("user", "name email");

    res.status(201).json(savedFeedback); // return the single feedback object
  } catch (err) {
    console.error("❌ Add feedback error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
