import api from './api';

const productService = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/id/${id}`),
  getBySlug: (slug) => api.get(`/products/slug/${slug}`),
  getFeatured: () => api.get('/products/featured'),
  getBestSellers: () => api.get('/products/bestsellers'),
  search: (query, params) => api.get('/products/search', { params: { q: query, ...params } }),

  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  remove: (id) => api.delete(`/products/${id}`),
  bulkDelete: (ids) => api.post('/products/bulk-delete', { ids }),

  uploadImages: (formData) =>
    api.post('/products/upload', formData, {
      transformRequest: [(data, headers) => {
        delete headers['Content-Type'];
        return data;
      }],
      timeout: 60000,
    }),
};

export default productService;
