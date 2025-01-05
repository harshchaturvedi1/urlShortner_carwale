import { useState, useEffect } from "react";
import api from "../services/api";

/**
 * Custom hook to fetch, manage, and paginate user-specific URLs.
 *
 * This hook is responsible for:
 * - Fetching URLs from the backend for the authenticated user.
 * - Managing pagination data (total pages and total URLs).
 * - Handling errors and updating state accordingly.
 */
export default function useFetchUrls() {
  // State to store URLs
  const [urls, setUrls] = useState([]);

  // State to track errors during fetch
  const [fetchError, setFetchError] = useState("");

  // State to store total number of pages for pagination
  const [totalPages, setTotalPages] = useState(1);

  // State to store total number of URLs
  const [totalUrls, setTotalUrls] = useState(0);

  /**
   * Fetch URLs from the backend for the given page and limit.
   *
   * @param {number} page - The current page number (default: 1).
   * @param {number} limit - The number of items per page (default: 10).
   */
  const fetchUrls = async (page = 1, limit = 10) => {
    try {
      const { data } = await api.get(
        `/url/user-urls?page=${page}&limit=${limit}`
      );

      // Update state with the fetched data
      setUrls(data.urls || []);
      setTotalPages(data.totalPages || 1);
      setTotalUrls(data.totalUrls || 0);
    } catch (error) {
      // Set the error message if fetch fails
      setFetchError(error.response?.data?.msg || "Failed to fetch URLs.");
      console.error("Fetch URLs Error:", error);
    }
  };

  // Fetch the first page of URLs on initial load
  useEffect(() => {
    fetchUrls();
  }, []);

  // Return relevant state and functions for the component to use
  return { urls, setUrls, fetchError, fetchUrls, totalPages, totalUrls };
}
