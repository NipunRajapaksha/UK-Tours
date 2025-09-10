import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true }, // single reference to Tour
    customerName: { type: String, required: true },
    userEmail: { type: String, required: false }, // optional for logged-in users
    contactNumber: { type: String, required: true },
    notes: { type: String },
    guests: { type: Number, default: 1 },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional link to registered user
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
