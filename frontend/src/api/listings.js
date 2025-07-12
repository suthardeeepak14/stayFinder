import API from "./axiosInstance";

export const getListings = (query = "") => API.get(`/properties${query}`);

export const createListing = (listingData) =>
  API.post("/properties", listingData);

export const getListingById = (id) => API.get(`/properties/${id}`);
