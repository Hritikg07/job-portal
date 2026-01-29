// Centralized error handling middleware
// Any route can call next(err) to reach here
const errorHandler = (err, req, res, next) => {
  console.error('Error handler:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';

  res.status(statusCode).json({
    message,
    // In production you might hide the stack; kept for learning.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;

