import React from "react";
import { Container, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SignupForm from "../components/Auth/SignupForm";

/**
 * Component: Signup
 * Provides a signup page for new users with a form and a navigation link to the login page.
 */
export default function Signup() {
  const { login } = useAuth(); // Custom hook for authentication
  const navigate = useNavigate(); // For programmatic navigation

  /**
   * Handles successful signup.
   * Logs in the user and redirects them to the dashboard.
   * @param {string} token - JWT token for authentication.
   * @param {Object} user - User details.
   */
  const handleSignupSuccess = (token, user) => {
    login(token, user); // Save the token and user in the auth context
    navigate("/"); // Redirect to the dashboard
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Signup form with a callback for successful signup */}
      <SignupForm onSignupSuccess={handleSignupSuccess} />

      {/* Navigation link to the login page */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <MuiLink component={RouterLink} to="/login">
          Log In
        </MuiLink>
      </Typography>
    </Container>
  );
}
