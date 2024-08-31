import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
  city: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
});

const Map = mongoose.model('Map', mapSchema);

export default Map;
