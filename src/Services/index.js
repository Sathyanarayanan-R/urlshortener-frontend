import api from '../Configs/axios';

const Api = {
  signup: (body) => api.post('https://urlshortener-backend-sj.onrender.com/api/auth/signup', body),
  login: (body) => api.post('https://urlshortener-backend-sj.onrender.com/api/auth/login', body),
  quickShorten: (body) => api.post('https://urlshortener-backend-sj.onrender.com/api/url/quick_create', body),
  createShorUrl: (body) => api.post('https://urlshortener-backend-sj.onrender.com/api/url/create', body),
  redirect: (shortUrl) => api.put(`https://urlshortener-backend-sj.onrender.com/api/url/redirect/${shortUrl}`),
  getDashboard: () => api.get('https://urlshortener-backend-sj.onrender.com/api/url/dashboard'),
  searchUrl: (longUrl) => api.get('https://urlshortener-backend-sj.onrender.com/api/url/search', { params: { longUrl } }),
  deleteUrl: (id) => api.delete(`https://urlshortener-backend-sj.onrender.com/api/url/delete/${id}`),
};

export default Api;
