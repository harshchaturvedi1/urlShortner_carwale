import React from "react";
import { Container, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/Auth/LoginForm";

export default function Login() {
  const { login } = useAuth(); // Access login method from Auth context
  const navigate = useNavigate(); // Hook for navigation

  /**
   * Callback for successful login.
   * Stores token and user in the Auth context, then navigates to the dashboard.
   * @param {string} token - JWT token for authentication
   * @param {object} user - Logged-in user details
   */
  const handleLoginSuccess = (token, user) => {
    login(token, user); // Save login details in Auth context
    navigate("/"); // Redirect to the Dashboard or Home page
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Login Form Component */}
      <LoginForm onLoginSuccess={handleLoginSuccess} />

      {/* Link to navigate to Signup */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <MuiLink component={RouterLink} to="/signup">
          Sign Up
        </MuiLink>
      </Typography>
    </Container>
  );
}
