import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ListingsContext = createContext();

// Custom hook to use the context easily
export const useListings = () => useContext(ListingsContext);

// Provider component
export const ListingsProvider = ({ children }) => {
  const [savedListings, setSavedListings] = useState(() => {
    // Load from localStorage initially (optional)
    const saved = localStorage.getItem("savedListings");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("savedListings", JSON.stringify(savedListings));
  }, [savedListings]);

  // Toggle save/unsave listing
  const toggleSavedListing = (listingId) => {
    setSavedListings((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  return (
    <ListingsContext.Provider value={{ savedListings, toggleSavedListing }}>
      {children}
    </ListingsContext.Provider>
  );
};
