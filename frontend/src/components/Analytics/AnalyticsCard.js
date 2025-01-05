import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

/**
 * AnalyticsCard Component
 *
 * Displays analytics data for a specific shortened URL in a card layout.
 *
 * Props:
 * - urlData (object): Contains analytics details for the URL.
 *   - shortId (string): Unique identifier for the shortened URL.
 *   - originalUrl (string): The original long URL.
 *   - clickCount (number): Number of times the short URL has been clicked.
 *
 * Returns:
 * - A Material-UI Card component displaying the analytics details.
 */
export default function AnalyticsCard({ urlData }) {
  // If no data is provided, render nothing
  if (!urlData) return null;

  return (
    <Card sx={{ mb: 2 }}>
      {/* Card Content */}
      <CardContent>
        {/* Short ID */}
        <Typography variant="h6">Short ID: {urlData.shortId}</Typography>

        {/* Original URL */}
        <Typography variant="body1">
          Original URL: {urlData.originalUrl}
        </Typography>

        {/* Click Count */}
        <Typography variant="body2">Clicks: {urlData.clickCount}</Typography>
      </CardContent>
    </Card>
  );
}
