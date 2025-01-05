import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import validator from "validator";
import { toast } from "react-toastify";
import api from "../../services/api";

/**
 * ShortenerForm Component
 *
 * A form to input a long URL and create a shortened URL.
 * Validates the URL format before sending it to the backend.
 * Displays success or error messages using toast notifications.
 *
 * @param {Function} onUrlCreated - Callback to handle the creation of a new shortened URL.
 *
 * @returns {JSX.Element} The form UI for URL shortening.
 */
export default function ShortenerForm({ onUrlCreated }) {
  const [url, setUrl] = useState(""); // State to hold the input URL

  /**
   * Handle form submission
   *
   * Validates the URL format and sends it to the backend.
   * If successful, invokes the `onUrlCreated` callback and resets the form.
   * Displays success or error messages based on the result.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate the URL format using `validator`
    if (
      !validator.isURL(url, {
        protocols: ["http", "https"],
        require_protocol: true,
      })
    ) {
      // Show an error toast for invalid URL
      toast.error(
        "Invalid URL format. Make sure to include http:// or https://."
      );
      return;
    }

    try {
      // Send the URL to the backend API
      const { data } = await api.post("/url/shorten", { originalUrl: url });

      // Invoke the callback with the newly created short URL and ID
      onUrlCreated(data.shortUrl, data.shortId);

      // Show a success toast
      toast.success("URL shortened successfully!");

      // Reset the input field
      setUrl("");
    } catch (error) {
      // Show an error toast with the response message or a default message
      toast.error(error.response?.data?.msg || "Failed to shorten URL.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // Attach form submission handler
      sx={{ mt: 2 }}
    >
      {/* Input field for the URL */}
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={url} // Bind the input field to state
        onChange={(e) => setUrl(e.target.value)} // Update state on input change
        margin="normal"
      />

      {/* Submit button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Shorten URL
      </Button>
    </Box>
  );
}
