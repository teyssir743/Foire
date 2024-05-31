import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedAdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("userData"));

    return user && user.role == "admin" ? (
        children
    ) : user && user.role == "exposant" ? (
        <Navigate to="/unauthorized" />
    ) : (
        <Navigate to="/login" />
    );
};
export default ProtectedAdminRoute;
