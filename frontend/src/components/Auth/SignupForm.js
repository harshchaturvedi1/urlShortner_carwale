import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

/**
 * SignupForm Component
 *
 * A form for user registration with client-side validations.
 * Includes fields for username, email, password, and confirm password.
 * Displays appropriate error messages and success notifications.
 *
 * Props:
 * - onSignupSuccess (function): Callback to handle post-signup actions (e.g., token and user state).
 */
export default function SignupForm({ onSignupSuccess }) {
  // State variables for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State variables for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Toggles the visibility of the password field.
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Toggles the visibility of the confirm password field.
   */
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  /**
   * Handles form submission.
   * Validates passwords and sends the data to the backend.
   *
   * @param {Event} e - Form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // API request to register the user
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      // Extract token and user from response
      const { token, user } = response.data;

      // Show success toast and execute success callback
      toast.success("Signup successful!");
      onSignupSuccess(token, user);
    } catch (error) {
      // Handle errors and show error toast
      toast.error(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      {/* Username Field */}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Email Field */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Password Field */}
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* Confirm Password Field */}
      <TextField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* Submit Button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}
