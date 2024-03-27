// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, userType, ...rest }) => {
  const { isLoggedIn, userType: currentUserType } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (userType && currentUserType !== userType) {
    return <Navigate to="/" />; // Redirect to homepage if userType doesn't match
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
