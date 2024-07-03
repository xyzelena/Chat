import axios from 'axios';

import { getItemStorage } from '../utils/authLocalStorage.js';

const baseURL = '/api/v1';

const axiosApi = axios.create({
  baseURL,
  timeout: 5000,
});

// Добавление interceptor для запросов
axiosApi.interceptors.request.use(
  (config) => {
    const data = getItemStorage();

    if (data) {
      config.headers.Authorization = `Bearer ${data.token}`;
    }

    console.log(config);

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// Добавление interceptor для ответов
axiosApi.interceptors.response.use(
  (response) => {
    // Здесь можно добавить дополнительную логику обработки ответов
    //console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
  // Здесь можно обрабатывать ошибки, например, обновлять токен при получении 401 ошибки
);

export default axiosApi;
