import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface HZRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterptorCatch?: (error: any) => any;
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptor?: (res: any) => any;
  responseInterptorCatch?: (error: any) => any;
}

export interface HZRequestConfig extends AxiosRequestConfig {
  interceptors?: HZRequestInterceptors;
  showLoading?: boolean;
}
