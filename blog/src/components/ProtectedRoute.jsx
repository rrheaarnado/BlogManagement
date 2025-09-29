import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth")); // auth now includes token

  if (!auth || !auth.token) {
    // No JWT found → redirect to login
    return <Navigate to="/" replace />;
  }

  return children; // user is logged in and has token
};

export default ProtectedRoute;
