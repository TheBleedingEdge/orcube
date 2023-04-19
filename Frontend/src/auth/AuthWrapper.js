// AuthWrapper.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ isAuthenticated, user, allowedRoles, children }) => {
    
  const hasAllowedRole = allowedRoles.some(role => {
    return user[role];
  });

  if (!hasAllowedRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
