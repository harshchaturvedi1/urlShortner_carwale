import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook to access authentication-related data and functions.
 *
 * This hook simplifies the process of consuming the AuthContext,
 * providing easy access to authentication state and methods like login, logout, etc.
 *
 * @returns {object} The authentication context containing user data and methods.
 */
export function useAuth() {
  // Access the AuthContext using React's useContext hook
  return useContext(AuthContext);
}
