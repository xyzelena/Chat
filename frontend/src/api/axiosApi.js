import axios from 'axios';
import ROUTES from '../utils/routes.js';

const axiosApi = axios.create({
  baseURL: ROUTES.baseURL(),
  timeout: 5000,
});

axiosApi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosApi;
