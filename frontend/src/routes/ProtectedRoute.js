import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../services/authService';

// Wrapper for protecting routes that require authentication
const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    // Redirect to login and remember where the user wanted to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

