import axios, { type AxiosError, type AxiosRequestConfig, AxiosInstance } from 'axios';

type ApiClientRead = <T>(
  url: string,
  config?: AxiosRequestConfig,
) => Promise<T>;

type ApiClientWrite = <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => Promise<T>;

export interface ApiClientErrorParams<T = any> {
  message?: string | undefined;
  name?: string | undefined;
  stack?: string | undefined;
  userMessage?: string | undefined;
  axiosError?: AxiosError<T>;
  response?: T;
}

export class ApiClientError<T = any> extends Error {
  userMessage: string | undefined;
  axiosError?: AxiosError<T>;
  response?: T | undefined;

  constructor(params?: ApiClientErrorParams<T>) {
    super();
    this.message = params?.message ?? "";
    this.name = params?.name ?? "ApiClientError";
    this.stack = params?.stack;
    this.userMessage = params?.userMessage;
    this.axiosError = params?.axiosError;
    this.response = params?.response;
  }
}

export const createAxiosClient = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config);
};

export const createApiClient = (client: AxiosInstance) => {
  const get: ApiClientRead = async (...args) => await client.get(...args);
  const httpDelete: ApiClientRead = async (...args) => await client.delete(...args);
  const post: ApiClientWrite = async (...args) => await client.post(...args);
  const put: ApiClientWrite = async (...args) => await client.put(...args);

  return { get, delete: httpDelete, post, put };
};
