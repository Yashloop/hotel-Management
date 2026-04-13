import axios from "axios";

const API_BASE = "http://localhost:8080/api"; // Backend URL

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};

export const hotelAPI = {
  getAll: () => api.get("/hotels"),
  getById: (id) => api.get(`/hotels/${id}`),
  search: (location) => api.get(`/hotels/search?location=${location}`),
};

export const roomAPI = {
  getByHotel: (hotelId) => api.get(`/rooms/hotel/${hotelId}`),
};

export const bookingAPI = {
  create: (data) => api.post("/bookings", data),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
  getHistory: () => api.get("/bookings/history"),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

export default api;
