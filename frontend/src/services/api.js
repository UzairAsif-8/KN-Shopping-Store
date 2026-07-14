import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('kn_admin_token');
  const token = localStorage.getItem('kn_token');
  const authToken = adminToken || token;

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('kn_token');
      localStorage.removeItem('kn_admin_token');
    }
    return Promise.reject(error);
  }
);

export default api;
