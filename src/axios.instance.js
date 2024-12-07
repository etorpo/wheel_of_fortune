import router from '@/router/index.js'
import axios from 'axios'
import {useAuthStore} from "@/stores/auth.js";
const axiosInst = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  withCredentials: false,
})

axiosInst.interceptors.request.use(
  config => {
    const authStore = useAuthStore();
    const token = authStore.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInst.interceptors.response.use(
  async response => {
    const delay = 300
    await new Promise(resolve => setTimeout(resolve, delay))
    return response
  },
  error => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response.status === 403 &&
        router.currentRoute.value.path !== '/login')
    ) {
      localStorage.removeItem('access_token')
      sessionStorage.removeItem('access_token')
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default axiosInst
