import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/style.css'
import router from '@/router'
import '@/assets/js/axios.interceptor.login.js'
// axios.defaults.baseURL='http://localhost:81'
// import axios from 'axios';
// // 添加请求拦截器
// axios.interceptors.request.use(function(config) {
//     // 在发送请求之前做些什么
//     console.log(config.url)
//     //如果不是送往支付宝的请求
//     if(!config.url.startsWith('/alipay')){
//         config.url = 'http://localhost:81' + config.url;
//     }
//     return config;
// });
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);//挂载路由组件
app.use(pinia);//挂载pinia组件
//异常处理
// app.config.errorHandler = (err,vm,info) => {
//     console.log("统一处理错误信息：" + err);
// }
// window.onunhandledrejection = function(event){
//
//   try{
//       console.error("全局异常处理：" + event.reason);
//       router.push("/error");
//   }catch (e) {
//
//   }
// }
// import axios from 'axios';
// // // 添加请求拦截器
// axios.interceptors.response.use(function(config) {
//     return config;
// },error => {
//     router.push("/error");
//     return Promise.reject(error);
// });

app.mount('#app');