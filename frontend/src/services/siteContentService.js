import api from './api';

const siteContentService = {
  getAll: () => api.get('/site-sections'),
  update: (key, image) => api.put(`/site-sections/${encodeURIComponent(key)}`, { image }),
  reset: (key) => api.delete(`/site-sections/${encodeURIComponent(key)}`),
};

export default siteContentService;
