import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    customerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
