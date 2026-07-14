import api from './api';

const reviewService = {
  getByProduct: (productId) => api.get(`/products/${productId}/reviews`),
  create: (productId, data) => api.post(`/products/${productId}/reviews`, data),
  update: (reviewId, data) => api.patch(`/reviews/${reviewId}`, data),
  delete: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

export default reviewService;
