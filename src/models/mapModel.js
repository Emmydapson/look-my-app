import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  city: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  latitude: { type: Number, required: true },  // Add latitude
  longitude: { type: Number, required: true }, // Add longitude
});

const Map = mongoose.model('Map', mapSchema);

export default Map;
