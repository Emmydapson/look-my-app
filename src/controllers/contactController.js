// controllers/contactController.js
import Contact from '../models/contactModel.js';

export const handleContactForm = async (req, res) => {
  const { name, companyName, email, message } = req.body;

  // Validate input
  if (!name || !companyName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new contact document
    const newContact = new Contact({
      name,
      companyName,
      email,
      message
    });

    // Save the contact document to the database
    await newContact.save();

    // Send a success response
    res.status(201).json({ success: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
