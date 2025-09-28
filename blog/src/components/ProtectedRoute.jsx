import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem("user"); // check login

    if (!user) {
        return <Navigate to="/" replace />; // redirect if not logged in
    }

    return children;
};

export default ProtectedRoute;
