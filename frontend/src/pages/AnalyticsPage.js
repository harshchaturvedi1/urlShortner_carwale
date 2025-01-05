import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import api from "../services/api";

export default function AnalyticsPage() {
  const { shortId } = useParams(); // Extract shortId from the route parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [analytics, setAnalytics] = useState(null); // State to store analytics data
  const [error, setError] = useState(""); // State to store any error messages

  // Fetch analytics data for the given shortId
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get(`/url/analytics/${shortId}`);
        setAnalytics(data); // Set the analytics data in state
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to load analytics."); // Handle error
      }
    };
    fetchAnalytics();
  }, [shortId]);

  // Handle back button click to navigate back in history
  const handleBackClick = () => {
    navigate(-1);
  };

  // Render error message if there's an issue with fetching analytics
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        {/* Back Button */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Button variant="outlined" onClick={handleBackClick}>
            Back
          </Button>
          <Typography variant="h6" color="error">
            Analytics Error
          </Typography>
        </Box>
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* Header Section with Back Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button variant="contained" onClick={handleBackClick}>
          Go Back
        </Button>
        <Typography variant="h6">Analytics for Short ID: {shortId}</Typography>
      </Box>

      {/* Display analytics details if data is available */}
      {analytics ? (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Original URL:</strong> {analytics.originalUrl}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Click Count:</strong> {analytics.clickCount}
            </Typography>
            <Typography variant="body1">
              <strong>Created At:</strong>{" "}
              {new Date(analytics.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        // Loading state while fetching analytics
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}
