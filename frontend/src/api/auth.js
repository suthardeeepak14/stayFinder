import API from "./axiosInstance";

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const fetchUserProfile = () => API.get("/auth/profile");
