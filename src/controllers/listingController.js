import Listing from '../models/listingModel.js';

// Create a new listing
export const createListing = async (req, res) => {
  const { title, description, location, imageUrl } = req.body;
  
  if (!title || !description || !location || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newListing = new Listing({ title, description, location, imageUrl });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all listings with pagination
export const getListings = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page
  try {
    const listings = await Listing.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Listing.countDocuments();
    res.json({
      listings,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single listing
export const getListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a listing
export const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, imageUrl } = req.body;
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { title, description, location, imageUrl },
      { new: true }
    );
    if (!updatedListing) return res.status(404).json({ error: 'Listing not found' });
    res.json(updatedListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a listing
export const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) return res.status(404).json({ error: 'Listing not found' });
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
