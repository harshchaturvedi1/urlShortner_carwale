import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ShortenerForm from "../components/UrlShortener/ShortenerForm";

export default function Home() {
  // State to store the shortened URL and its ID
  const [shortUrl, setShortUrl] = useState(null);
  const [shortId, setShortId] = useState(null);

  /**
   * Callback to handle successful URL shortening.
   * Updates the state with the shortened URL and its ID.
   * @param {string} url - The shortened URL
   * @param {string} id - The unique short ID for the URL
   */
  const handleShortened = (url, id) => {
    setShortUrl(url); // Store the shortened URL
    setShortId(id); // Store the short ID
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Welcome to URL Shortener
      </Typography>

      {/* URL Shortener Form */}
      <ShortenerForm onShortened={handleShortened} />

      {/* Display Shortened URL */}
      {shortUrl && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </Typography>
      )}

      {/* Display Short ID */}
      {shortId && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Short ID: {shortId}
        </Typography>
      )}
    </Container>
  );
}
