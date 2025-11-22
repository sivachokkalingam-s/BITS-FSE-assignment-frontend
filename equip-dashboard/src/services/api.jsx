import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 403) {
      console.warn('Access denied or expired session');
    }
    return Promise.reject(err);
  }
);

export default api;
