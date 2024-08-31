import Map from '../models/mapModel.js';
import { GOOGLE_MAPS_API_KEY } from '../config/apiConfig.js';

// Fetch the Google Maps API Key
export const getGoogleMapsApiKey = (req, res) => {
    try {
      res.json({ apiKey: GOOGLE_MAPS_API_KEY });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve API key' });
    }
  };
// Create a new map
export const createMap = async (req, res) => {
  const { city, imageUrl, description } = req.body;
  try {
    const newMap = new Map({
      city,
      imageUrl,
      description,
    });
    await newMap.save();
    res.status(201).json(newMap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create map' });
  }
};

// Get all maps
export const getMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve maps' });
  }
};

// Get a single map
export const getMapById = async (req, res) => {
  const { id } = req.params;
  try {
    const map = await Map.findById(id);
    if (!map) return res.status(404).json({ error: 'Map not found' });
    res.json(map);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve map' });
  }
};

// Update a map
export const updateMap = async (req, res) => {
  const { id } = req.params;
  const { city, imageUrl, description } = req.body;
  try {
    const updatedMap = await Map.findByIdAndUpdate(id, {
      city,
      imageUrl,
      description,
    }, { new: true });
    if (!updatedMap) return res.status(404).json({ error: 'Map not found' });
    res.json(updatedMap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update map' });
  }
};

// Delete a map
export const deleteMap = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMap = await Map.findByIdAndDelete(id);
    if (!deletedMap) return res.status(404).json({ error: 'Map not found' });
    res.json({ message: 'Map deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete map' });
  }
};
