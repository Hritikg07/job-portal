const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Basic middlewares
app.use(express.json()); // Parse JSON bodies

// Enable CORS for the frontend origin
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Simple health check route
app.get('/', (req, res) => {
  res.json({ message: 'Job Portal API is running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Centralized error handler (should be after routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

