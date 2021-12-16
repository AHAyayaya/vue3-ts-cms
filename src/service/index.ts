import HZRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

const hzRequest = new HZRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 添加请求头token
      const token = "";
      if (!config.headers) {
        config.headers = {};
      }
      if (token) {
        config.headers.Authorization = token;
      }
      console.log("请求成功拦截");
      return config;
    },
    requestInterptorCatch: (err) => {
      console.log("请求失败拦截");
      return err;
    },
    responseInterceptor: (res) => {
      console.log("响应成功拦截");
      return res;
    },
    responseInterptorCatch: (err) => {
      console.log("响应失败拦截");
      return err;
    }
  }
});

// 如果请求url有多个
// const hzRequest1 = new HZRequest({
//   baseURL: "地址1"
// });
// const hzRequest2 = new HZRequest({
//   baseURL: "地址1"
// });

// export default { hzRequest1, hzRequest2 };
export default hzRequest;
