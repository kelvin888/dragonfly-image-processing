import env from '@/config';
import { createAxiosClient, createApiClient, ApiClientError } from '.';

const config = {
  headers: {
    'Content-Type': 'image/jpeg',
  },
};

const client = createAxiosClient(config);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

const { get, delete: httpDelete, post, put } = createApiClient(client);

export const getFromAws = get;
export const deleteFromAws = httpDelete;
export const postToAws = (url: string, data: any, additionalHeaders: Record<string, string>) => {
  return post(url, data, { headers: { ...config.headers, ...additionalHeaders } });
};
export const updateOnAws = (url: string, data?: any, additionalHeaders?: Record<string, string>) => {
  return put(url, data, { headers: { ...config.headers, ...additionalHeaders } });
};

export { ApiClientError };
