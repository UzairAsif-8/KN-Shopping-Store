import api from './api';

const orderService = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  cancel: (id) => api.patch(`/orders/${id}/cancel`),
};

export default orderService;
