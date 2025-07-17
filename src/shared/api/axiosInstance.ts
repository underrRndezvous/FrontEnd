import axios from 'axios';

const axiosInstance = axios.create({
  
  baseURL: 'https://api.example.com',
});

export default axiosInstance;