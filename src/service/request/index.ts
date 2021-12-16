import axios from "axios";
import type { AxiosInstance } from "axios";
import type { HZRequestInterceptors, HZRequestConfig } from "./types";

import { ElLoading } from "element-plus";
import { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";

const DEFAULT_LOADING = true;

class HZRequest {
  instance: AxiosInstance;
  interceptors?: HZRequestInterceptors;
  showLoading: boolean;
  loading?: ILoadingInstance;

  constructor(config: HZRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.interceptors = config.interceptors;

    // 使用拦截器
    // 从config中读取出的拦截器是对应的实例的拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterptorCatch
    );

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有实例都有的拦截器:请求成功拦截");
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "加载中....",
            background: "rgba(0,0,0,.5)"
          });
        }

        return config;
      },
      (err) => {
        console.log("所有实例都有的拦截器:请求失败拦截");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close();
        console.log("所有实例都有的拦截器:响应成功拦截");
        return res.data;
      },
      (err) => {
        this.loading?.close();
        console.log("所有实例都有的拦截器:响应失败拦截", err.response.status);
        return err;
      }
    );
  }

  // 封装请求
  request<T>(config: HZRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.單個請求對數據的處理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 2.将showloading设置为true
          this.showLoading = DEFAULT_LOADING;

          // 3.将结果resolve返回
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: HZRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: HZRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: HZRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: HZRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default HZRequest;
