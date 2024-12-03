import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('jwtToken'); // Check if JWT exists in local storage

  if (!token) {
    // If the token doesn't exist, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the child component
  return children;
};

export default ProtectedRoute;
