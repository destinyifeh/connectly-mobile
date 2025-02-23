import axios from 'axios';

const createApiInstance = () => {
  const apiInstance = axios.create({
    baseURL: 'http://192.168.0.199:4000',
    headers: {
      'Content-Type': 'application/json',
    },
    // timeout: 5000,
  });

  // Add a request interceptor
  apiInstance.interceptors.request.use(
    config => {
      // Modify request config (e.g., add authentication tokens) before sending the request
      // config.headers.Authorization = `Bearer ${token}`;
      console.log('Outgoing request', {
        url: config.url,
        method: config.method,
        data: config.data,
        params: config.params,
        headers: config.headers,
        baseURL: config.baseURL,
        timeout: config.timeout,
      });
      return config;
    },
    error => {
      console.log(error, 'request err');
      console.log(error.response, 'request err');
      // Handle request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  apiInstance.interceptors.response.use(
    response => {
      // Process the response data
      console.log(response, 'respoooo');
      return response;
    },
    error => {
      console.log(error.response, 'res err');
      console.log(error, 'res err');
      // Handle response errors
      return Promise.reject(error);
      //eturn Promise.reject(new Error(error));
    },
  );

  return apiInstance;
};

export default createApiInstance;
