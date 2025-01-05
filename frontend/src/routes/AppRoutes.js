import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/Shared/ProtectedRoute";
import AnalyticsPage from "../pages/AnalyticsPage";

/**
 * Component: AppRoutes
 * Defines all routes for the application, including public, protected, and fallback routes.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - Accessible without authentication */}
      <Route path="/login" element={<Login />} /> {/* Login page */}
      <Route path="/signup" element={<Signup />} /> {/* Signup page */}
      {/* Protected Routes - Accessible only with authentication */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {" "}
            {/* Ensures the user is authenticated */}
            <Dashboard /> {/* Dashboard - Landing page */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/:shortId"
        element={
          <ProtectedRoute>
            {" "}
            {/* Protects analytics route */}
            <AnalyticsPage /> {/* Analytics page for a specific shortId */}
          </ProtectedRoute>
        }
      />
      {/* Fallback Route for Undefined Paths */}
      <Route path="*" element={<h2>404 Not Found</h2>} />{" "}
      {/* Generic 404 page */}
    </Routes>
  );
}
