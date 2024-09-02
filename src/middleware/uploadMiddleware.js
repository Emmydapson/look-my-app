// uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/'; // Define the folder to save uploaded files

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append a unique timestamp to the file name
  },
});

// Set up multer for handling multiple files
const upload = multer({ storage });

// Middleware for handling file uploads
export const uploadFiles = upload.fields([
  { name: 'coverImage', maxCount: 1 }, // Accept one file for 'coverImage'
  { name: 'logo', maxCount: 1 }        // Accept one file for 'logo'
]);

export default uploadFiles;
