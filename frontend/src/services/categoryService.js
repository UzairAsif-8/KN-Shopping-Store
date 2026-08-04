import api from './api';

const categoryService = {
  getAll: (params = {}) => api.get('/categories', { params }),
  getById: (id) => api.get(`/categories/${id}`),
  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),
  create: (payload) => api.post('/categories', payload),
  update: (id, payload) => api.put(`/categories/${id}`, payload),
  remove: (id) => api.delete(`/categories/${id}`),
};

export default categoryService;
