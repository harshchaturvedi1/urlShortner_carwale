import React, { useState } from "react";
import { Container, Typography, Button, Box, Pagination } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import ShortenerForm from "../components/UrlShortener/ShortenerForm";
import UrlList from "../components/UrlShortener/UrlList";
import useFetchUrls from "../hooks/useFetchUrls";

export default function Dashboard() {
  // Retrieve user information and logout function from the authentication context
  const { user, logout } = useAuth();

  // Custom hook to fetch URLs and manage state
  const { urls, setUrls, fetchError, fetchUrls, totalPages } = useFetchUrls();

  // State to track the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Handle user logout by invoking the logout function from context
   */
  const handleLogout = () => logout();

  /**
   * Callback to handle a new URL creation.
   * Updates the state and refreshes the current page's data.
   * @param {string} shortUrl - The shortened URL
   * @param {string} shortId - The unique identifier for the URL
   */
  const handleUrlCreated = (shortUrl, shortId) => {
    const newUrlObj = { shortId, shortUrl };
    setUrls((prev) =>
      Array.isArray(prev) ? [...prev, newUrlObj] : [newUrlObj]
    );
    fetchUrls(currentPage); // Refresh the current page
  };

  /**
   * Handle page change for pagination.
   * Updates the current page and fetches the data for that page.
   * @param {object} event - The event object
   * @param {number} page - The selected page number
   */
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchUrls(page); // Fetch data for the selected page
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Header Section with Welcome Message and Logout Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Hello, {user?.username}</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* URL Shortener Form */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Shorten a new URL:
      </Typography>
      <ShortenerForm onUrlCreated={handleUrlCreated} />

      {/* List of Shortened URLs */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Your Shortened URLs
      </Typography>
      {fetchError ? (
        // Error message if fetching URLs fails
        <Typography color="error">Failed to load URLs: {fetchError}</Typography>
      ) : (
        <>
          {/* Render URL List Component */}
          <UrlList urls={urls} />

          {/* Pagination for Navigating through URL Pages */}
          <Pagination
            count={totalPages} // Total number of pages
            page={currentPage} // Current active page
            onChange={handlePageChange} // Page change handler
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </Container>
  );
}
