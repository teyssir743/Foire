import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ExpoProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("userData"));

    return user && (user.role == "exposant" || user.role == "admin") ? (
        children
    ) : (
        <Navigate to="/login" />
    );
};
export default ExpoProtectedRoute;
