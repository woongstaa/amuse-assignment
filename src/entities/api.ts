import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const API_URL = 'http://localhost:8000/';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

export const api = async <T>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete', //
  requestUrl: string,
  data?: T,
  options?: AxiosRequestConfig,
  onError?: (response: AxiosResponse) => void
): Promise<T> => {
  try {
    const response = await apiClient({
      method,
      url: requestUrl,
      ...options,
      data
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    if (onError) {
      onError(response);
      return Promise.reject(response);
    }

    return Promise.reject(new Error(`API Error: ${response.status} ${response.statusText}`));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      if (error.response && onError) {
        onError(error.response);
      }
      return Promise.reject(error.response?.data || error);
    }

    return Promise.reject(error);
  }
};
