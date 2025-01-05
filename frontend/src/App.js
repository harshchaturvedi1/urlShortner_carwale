import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"; // Material-UI components
import { BrowserRouter } from "react-router-dom"; // Router for navigation
import AuthProvider from "./context/AuthContext"; // Provides authentication context
import AppRoutes from "./routes/AppRoutes"; // Centralized route management
import { ToastContainer } from "react-toastify"; // Notifications container
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

// Define the Material-UI theme for consistent styling
const theme = createTheme({
  palette: {
    primary: { main: "#1976D2" }, // Primary color for buttons, links, etc.
    secondary: { main: "#FF9800" }, // Secondary color for highlights
  },
});

function App() {
  return (
    // Provides the theme to the entire application
    <ThemeProvider theme={theme}>
      {/* Global notifications container */}
      <ToastContainer />

      {/* Normalize and reset default browser styles */}
      <CssBaseline />

      {/* Authentication context for managing user sessions */}
      <AuthProvider>
        {/* Enables routing within the application */}
        <BrowserRouter>
          {/* Defines and manages all application routes */}
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
