import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    places: [{ type: String, required: true }],
    days: { type: Number, required: true },
    description: { type: String },
    photos: [{
      url: String,
      public_id: String
    }]
  },
  { timestamps: true }
);

export default mongoose.model('Tour', tourSchema);
