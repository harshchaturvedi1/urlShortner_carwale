import React from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * UrlList Component
 *
 * Displays a list of URLs in a card-based layout.
 * Each card includes the Short ID, Short URL, and Original URL (if available).
 *
 * @param {Array} urls - List of URLs to display. Each URL object should contain shortId, shortUrl, and originalUrl.
 *
 * @returns {JSX.Element} A grid of URL cards or a message if no URLs are provided.
 */
export default function UrlList({ urls }) {
  // Check if the URLs list is empty or undefined
  if (!urls || urls.length === 0) {
    return <Typography>No URLs yet.</Typography>; // Display a message when no URLs are available
  }

  return (
    <Box
      sx={{
        mt: 2, // Margin-top for spacing
        display: "grid", // Use grid layout
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Responsive columns
        gap: 2, // Spacing between grid items
      }}
    >
      {urls.map((item) => (
        <Card key={item.shortId} variant="outlined">
          <CardContent>
            {/* Display Short ID */}
            <Typography variant="h6">Short ID: {item.shortId}</Typography>

            {/* Display Short URL */}
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Short URL:</strong>{" "}
              <MuiLink
                href={`${process.env.REACT_APP_API_URL}/${item.shortId}`} // Generate Short URL link
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Prevent security vulnerabilities
                underline="hover" // Add hover underline
              >
                {`${process.env.REACT_APP_API_URL}/${item.shortId}`}
              </MuiLink>
            </Typography>

            {/* Display Original URL if available */}
            {item.originalUrl && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Original URL:</strong> {item.originalUrl}
              </Typography>
            )}
          </CardContent>

          {/* Actions: View Analytics Button */}
          <CardActions>
            <Button
              component={RouterLink} // Use React Router for navigation
              to={`/analytics/${item.shortId}`} // Navigate to analytics page for the URL
              size="small"
              variant="contained"
            >
              View Analytics
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
