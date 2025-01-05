import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

/**
 * AuthProvider component to manage authentication state and provide context to the app.
 *
 * This component wraps around the application and provides authentication-related
 * state and functions (like login, logout) to its children through the AuthContext.
 *
 * @param {object} props - React props.
 * @param {React.ReactNode} props.children - Child components that require access to the AuthContext.
 *
 * @returns {JSX.Element} A provider component that supplies authentication data and methods.
 */
export default function AuthProvider({ children }) {
  // State to store the authentication token
  const [token, setToken] = useState(null);

  // State to store the currently authenticated user's data
  const [user, setUser] = useState(null);

  // State to indicate whether authentication data is being loaded
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load saved authentication data from local storage on component mount.
   */
  useEffect(() => {
    const savedToken = localStorage.getItem("jwtToken"); // Retrieve saved token
    const savedUser = localStorage.getItem("user"); // Retrieve saved user data

    if (savedToken) setToken(savedToken); // Restore token if available
    if (savedUser) setUser(JSON.parse(savedUser)); // Parse and restore user data

    setIsLoading(false); // Mark loading as complete
  }, []);

  /**
   * Handle user login.
   *
   * @param {string} newToken - The JWT token received after login.
   * @param {object} userData - User data associated with the authenticated user.
   */
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);

    // Save token and user data to local storage for persistence
    localStorage.setItem("jwtToken", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * Handle user logout.
   *
   * Clears the authentication token and user data from both state and local storage.
   */
  const logout = () => {
    setToken(null);
    setUser(null);

    // Remove token and user data from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  };

  return (
    // Provide authentication-related state and methods to children components
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
