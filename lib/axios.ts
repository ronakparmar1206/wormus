import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://iship-api.zyberzing.com', // Adjust port as needed

  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    // Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;