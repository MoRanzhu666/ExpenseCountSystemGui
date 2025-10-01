import axios from 'axios';
import router from '@/router'; // 导入路由实例
import { ElMessage } from 'element-plus';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

// 请求拦截器（可选，添加token等）
service.interceptors.request.use(
  config => {
    // 从本地存储获取token并添加到请求头
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器（处理异常）
service.interceptors.response.use(
  response => {
    // 正常响应直接返回数据
    
    return response.data;
  },
  error => {
    // 全局异常处理
    const { response } = error;
    console.log("error", error)
    if (response) {
      // 处理401未授权异常
      if (response.status === 401) {
        // 清除无效token
        localStorage.removeItem('token');
        // 记录当前页面地址，登录后可跳转回来
        const currentPath = router.currentRoute.value.fullPath;
        if (currentPath !== '/login') {
          router.push(`/login?redirect=${currentPath}`);
        }
        // 显示错误提示
        ElMessage.error('登录已过期，请重新登录');
      } 
      // 处理其他状态码
      else if (response.status === 403) {
        ElMessage.error('没有权限访问');
      }
      else if (response.status === 500) {
        ElMessage.error('服务器内部错误，请稍后再试');
      }
    } else {
      // 网络错误（无响应）
      ElMessage.error('网络连接异常，请检查网络');
    }
    
    return Promise.reject(error);
  }
);

export default service;
