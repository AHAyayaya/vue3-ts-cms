import { createApp } from "vue";
import { globalRegister } from "./global";

import hzRequest from "./service";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(globalRegister);
app.use(router);
app.use(store);

app.mount("#app");

// hzRequest.request({
//   url: "/department/list",
//   method: "GET"
// });

// 对单独响应进行拦截
// hzRequest.request({
//   url: "/department/list",
//   method: "GET",
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log("单独请求的config");
//       return config;
//     },
//     responseInterceptor: (res) => {
//       console.log("单独响应的res");
//       return res;
//     }
//   }
// });

hzRequest.get({
  url: "/department/list"
});
