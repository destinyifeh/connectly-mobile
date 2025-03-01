import {ACCESS_TOKEN_KEY, API_BASE_URL} from '@/constants/config';
import {isAuthTokenExpired, refreshAuthAccessToken} from '@/helpers/auth';
import {getDeviceData} from '@/stores/device-store';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 5000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async config => {
    let accessToken = await getDeviceData(ACCESS_TOKEN_KEY);
    if (accessToken && isAuthTokenExpired(accessToken)) {
      accessToken = await refreshAuthAccessToken();
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
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
apiClient.interceptors.response.use(
  response => {
    // Process the response data
    console.log(response, 'respoooo');
    return response;
  },
  async error => {
    console.log(error.response, 'res err');
    console.log(error, 'res err');
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAuthAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }
    }
    // Handle response errors
    return Promise.reject(error);
    //eturn Promise.reject(new Error(error));
  },
);

export default apiClient;
