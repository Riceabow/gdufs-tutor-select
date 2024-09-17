
import axios from "axios";  
import { useUserStore } from "../store/user";
const service = axios.create({  
    baseURL: 'http://43.143.229.82:8081' 
});  
  
// 请求拦截器  
service.interceptors.request.use(  
    config => {  
        // 检查localStorage中是否存在token  
        // console.log('token')
        const userStore = useUserStore()
        const requestHeader = userStore.requestHeader.value; // 假设你的token键是'token'  
        if (requestHeader) { 
            // 如果存在token，则将其添加到请求头中  
            const token = requestHeader.token
            config.headers.Authorization = `Bearer ${token}`; // 假设你的API期望的token格式是Bearer token  
        }  
        // 发送请求之前的处理（可选）  
  
        return config;  
    },  
    error => {  
        // 对请求错误做些什么  
        return Promise.reject(error);  
    }  
);  
  
// 响应拦截器  
service.interceptors.response.use(  
    response => {  
        // 对响应数据做点什么  
        return response.data; 
    },  
    error => {  
      return Promise.reject(error); // 或其他适当的错误对象  
    }  
);  
  
export default service;