import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";
import {useRouter} from "vue-router";
export const useAuthStore = defineStore('auth', () =>{
  const authError = ref('');
  const router = useRouter();
  const getAuthToken = () => {
    return localStorage.getItem('access_token') || false;
  }

  const login = async (email, password) => {
    const request = {
      email: email,
      password: password
    }

    const response = await axiosInst.post('/login', request);
    if (response.data.token) {
      localStorage.setItem('access_token', response.data.token);
      window.location.reload();
    }
    if (response.data.error) {
      authError.value = response.data.error;
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  const register = async (request) => {
    const response = await axiosInst.post('/register', request);
    if (response.data.token) {
      localStorage.setItem('access_token', response.data.token);
      await router.push('/');
    }
    if (response.data.error) {
      authError.value = response.data.error;
    }
  }

  return {
    getAuthToken,
    login,
    register,
    authError,
    logout
  };
})
