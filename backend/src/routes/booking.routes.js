import express from "express";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

const router = express.Router();

// CREATE booking
router.post("/", async (req, res) => {
  try {
    const { tourId, customerName, userEmail, contactNumber, notes, guests, date } = req.body;

    // Validate required fields
    if (!tourId || !customerName || !userEmail) {
      return res.status(400).json({ msg: "Tour ID, customer name, and email are required" });
    }

    // Validate tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ msg: "Tour not found" });

    // Create booking
    const booking = new Booking({
      tour: tour._id,
      customerName,
      userEmail, // use email from frontend
      contactNumber: contactNumber || "",
      notes: notes || "",
      guests: guests || 1,
      date: date ? new Date(date) : new Date(),
      status: "pending",
      user: req.user?.id || null, // link if logged in
    });

    await booking.save();

    // Populate tour for frontend
    const populatedBooking = await booking.populate("tour", "name price");

    res.status(201).json({ msg: "Booking confirmed!", booking: populatedBooking });
  } catch (err) {
    console.error("❌ Booking creation error:", err.message);
    res.status(500).json({ msg: "Failed to create booking", error: err.message });
  }
});

// GET all bookings (admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tour", "name price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Fetch bookings error:", err.message);
    res.status(500).json({ msg: "Failed to fetch bookings", error: err.message });
  }
});

// UPDATE booking status (admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ msg: "Status is required" });

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("tour", "name price");

    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    res.json({ msg: "Booking status updated", booking });
  } catch (err) {
    console.error("❌ Update booking error:", err.message);
    res.status(500).json({ msg: "Failed to update booking", error: err.message });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    res.json({ msg: "Booking deleted successfully" });
  } catch (err) {
    console.error("❌ Delete booking error:", err.message);
    res.status(500).json({ msg: "Failed to delete booking", error: err.message });
  }
});

export default router;
