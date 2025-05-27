import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = Cookies.get("jwt")
console.log(isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
}
