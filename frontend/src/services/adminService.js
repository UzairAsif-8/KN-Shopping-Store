import api from './api';

const adminService = {
  login: (credentials) =>
    api.post('/admin/login', credentials, { withCredentials: true }),

  logout: () =>
    api.post('/admin/logout', {}, { withCredentials: true }),

  refresh: () =>
    api.post('/admin/refresh', {}, { withCredentials: true }),

  getProfile: () => api.get('/admin/me'),

  changeEmail: (payload) => api.patch('/admin/me/email', payload),

  changePassword: (payload) =>
    api.patch('/admin/me/password', payload, { withCredentials: true }),

  getDashboard: () => api.get('/admin/dashboard'),
};

export default adminService;
