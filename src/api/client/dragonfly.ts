import env from '@/config';
import { createAxiosClient, createApiClient, ApiClientError } from '.';

const config = {
  baseURL: env.DRAGONFLY_SERVICE_ENDPOINT,
  headers: {
    Authorization: env.DRAGONFLY_API_KEY,
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

export const getFromDragonfly = get;
export const deleteFromDragonfly = httpDelete;
export const postToDragonfly = (url: string, data?: any, additionalHeaders?: Record<string, string>) => {
  return post(url, data, { headers: { ...config.headers, ...additionalHeaders } });
};
export const updateOnDragonfly = put;

export { ApiClientError };
