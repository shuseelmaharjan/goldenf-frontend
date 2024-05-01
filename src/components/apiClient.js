import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://data.goldenfutureinstitute.com.np',
  // baseURL: 'http://localhost:8000', 
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
