import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate to redirect
import { useSelector } from 'react-redux';   // Use Redux state if applicable

function ProtectedRoute({ children }) {
  // Check if user is authenticated (from Redux store or localStorage)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) || localStorage.getItem('authToken');

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected component
  return children;
}

export default ProtectedRoute;
