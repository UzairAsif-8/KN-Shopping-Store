import api from './api';

const paymentService = {
  createIntent: (amount) => api.post('/payments/create-intent', { amount }),
  confirmPayment: (paymentIntentId) => api.post('/payments/confirm', { paymentIntentId }),
  getMethods: () => api.get('/payments/methods'),
};

export default paymentService;
