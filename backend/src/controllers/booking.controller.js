import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { userEmail, customerName, contactNumber, tourId, notes } = req.body;
    const booking = await Booking.create({ userEmail, customerName, contactNumber, tour: tourId, notes });
    res.status(201).json(booking);
  } catch (e) { res.status(500).json({ msg: 'Server error' }); }
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate('tour').sort({ createdAt: -1 });
  res.json(bookings);
};
