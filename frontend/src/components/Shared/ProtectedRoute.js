import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * ProtectedRoute Component
 *
 * A wrapper for routes that require authentication.
 * Renders child components if the user is authenticated.
 * Redirects to the login page if the user is not authenticated.
 * Displays a loading placeholder while authentication status is being determined.
 *
 * @param {ReactNode} children - The child components to render if authenticated.
 *
 * @returns {JSX.Element} The rendered component or a redirection to the login page.
 */
export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useAuth(); // Access authentication state and loading status

  // Show a loading placeholder while authentication status is being determined
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a loading spinner or placeholder as needed
  }

  // Redirect to the login page if no valid token is found
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Render child components if the user is authenticated
  return children;
}
