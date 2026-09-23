import axios from 'axios';

const API = axios.create({
  baseURL: 'https://smart-clinic-portal-umtb.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('clinicUser'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;