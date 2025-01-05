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
 * LoginForm Component
 *
 * A form for user login with client-side validations.
 * Accepts user email and password and sends a login request to the server.
 * Displays appropriate success and error notifications.
 *
 * Props:
 * - onLoginSuccess (function): Callback to handle actions after successful login.
 */
export default function LoginForm({ onLoginSuccess }) {
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variable for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggles the visibility of the password field.
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Handles form submission.
   * Sends login credentials to the server and processes the response.
   *
   * @param {Event} e - Form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to login
      const response = await api.post("/auth/login", { email, password });

      // Extract token and user details from response
      const { token, user } = response.data;

      // Show success toast and execute the success callback
      toast.success("Login successful!");
      onLoginSuccess(token, user);
    } catch (error) {
      // Handle errors and show error toast
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      {/* Form Title */}
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      {/* Email Input Field */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password Input Field */}
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

      {/* Submit Button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Log In
      </Button>
    </Box>
  );
}
