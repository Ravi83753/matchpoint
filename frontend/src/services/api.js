import axios from 'axios';

// IF we are in production, use the environment variable. ELSE use localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_URL,
});

// ... rest of your code remains the same ...
// --- PUBLIC ROUTES ---
export const fetchCourts = async () => {
  const response = await API.get('/courts');
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await API.post('/bookings', bookingData);
  return response.data;
};

// --- ADMIN ROUTES ---
export const fetchAdminCourts = async () => {
  const response = await API.get('/admin/courts');
  return response.data;
};

export const updateCourtPrice = async (id, price) => {
  const response = await API.put(`/admin/courts/${id}`, { basePrice: price });
  return response.data;
};

export const fetchCoaches = async () => {
  const response = await API.get('/admin/coaches');
  return response.data;
};

export const toggleCoach = async (id, status) => {
  const response = await API.put(`/admin/coaches/${id}`, { isAvailable: status });
  return response.data;
};

export const createRule = async (ruleData) => {
  const response = await API.post('/admin/rules', ruleData);
  return response.data;
};

export default API;