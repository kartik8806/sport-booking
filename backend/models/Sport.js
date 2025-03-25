import mongoose from 'mongoose';

const SportSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: true
  },
  availableseat:{
    type: Number,
    required: true,
  },
  booking: [{ type: mongoose.Types.ObjectId, ref:"Booking"}],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }
}, { timestamps: true });
export default  mongoose.model("Sport", SportSchema);

