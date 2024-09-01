import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  coverImage: { type: String, required: true }, // Path to image
  logo: { type: String, required: true }, // Path to logo
  website: { type: String },
  googleNavigator: { type: String },
  email: { type: String },
  phone: { type: String },
}, { timestamps: true });

export default mongoose.model('Listing', listingSchema);
