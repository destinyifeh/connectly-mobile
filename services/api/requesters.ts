import axios, {AxiosResponse} from 'axios';
import {ApiResponse, PostData} from './api-types';
import createApiInstance from './config';

const api = createApiInstance();

export const fetchData = async (
  url: string,
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response || error;
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const postData = async (
  url: string,
  data: PostData,
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    if (data?.file) {
      console.log(data, 'dataass');
      const formData = new FormData();

      formData.append('profilePhoto', data.file);
      formData.append('confirmPassword', data.confirmPassword);
      formData.append('dob', data.dob);
      formData.append('email', data.email);
      formData.append('gender', data.gender);
      formData.append('password', data.password);
      formData.append('phone', data.phone);
      formData.append('username', data.username);
      formData.append('state', data.state);
      formData.append('city', data.city);
      formData.append('country', data.country);
      data.hobbies.forEach((hobby: string) => {
        formData.append('hobbies[]', hobby);
      });

      const response = await api.post(url, formData, {
        headers: {'content-type': 'multipart/form-data'},
      });
      return response;
    } else {
      const response = await api.post(url, data);
      return response;
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response || error;
    } else {
      // Handle non-Axios errors

      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateData = async (
  url: string,
  data: PostData,
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await api.put(url, data);
    // Handle the response data if needed
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response || error;
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const deleteData = async (
  url: string,
): Promise<AxiosResponse<ApiResponse>> => {
  try {
    const response = await api.delete(url);
    // Handle the response data if needed
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response || error;
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
