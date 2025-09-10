import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

// Get all bookings (for admin)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tour", "name price") // only fetch name + price of tour
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Get bookings error:", err.message);
    res.status(500).json({ msg: "Failed to fetch bookings", error: err.message });
  }
};

// Create booking (customer)
export const createBooking = async (req, res) => {
  try {
    const { customerName, contactNumber, guests, tourId } = req.body;

    if (!tourId || !customerName) {
      return res.status(400).json({ msg: "Tour ID and customer name are required" });
    }

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }

    const booking = new Booking({
      customerName,
      contactNumber,
      guests: guests || 1,
      tour: tour._id,
      userEmail: req.user?.email || req.body.userEmail || null, // prefer auth, fallback to body
      user: req.user?.id || null,
      status: "pending",
    });

    await booking.save();
    const populated = await booking.populate("tour", "name price");

    res.status(201).json(populated);
  } catch (err) {
    console.error("❌ Create booking error:", err.message);
    res.status(500).json({ msg: "Failed to create booking", error: err.message });
  }
};

// Update booking status (admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ msg: "Status is required" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("tour", "name price");

    if (!booking) return res.status(404).json({ msg: "Booking not found" });
    res.json(booking);
  } catch (err) {
    console.error("❌ Update booking error:", err.message);
    res.status(500).json({ msg: "Failed to update booking", error: err.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.json({ msg: "Booking deleted successfully" });
  } catch (err) {
    console.error("❌ Delete booking error:", err.message);
    res.status(500).json({ msg: "Failed to delete booking", error: err.message });
  }
};
