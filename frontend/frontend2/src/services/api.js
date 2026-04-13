import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token (mock for now)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const hotelsAPI = {
  getAll: () => api.get('/hotels'),
  getById: (id) => api.get(`/hotels/${id}`),
  create: (data) => api.post('/hotels', data),
  update: (id, data) => api.put(`/hotels/${id}`, data),
};

export const roomsAPI = {
  create: (data) => api.post('/rooms', data),
};

export const bookingsAPI = {
  getHistory: () => api.get('/bookings/history'),
  delete: (id) => api.delete(`/bookings/${id}`),
  approve: (id) => api.patch(`/bookings/${id}/approve`),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
};

export const statsAPI = {
  getDashboardStats: () => api.get('/stats'),
};

export default api;

