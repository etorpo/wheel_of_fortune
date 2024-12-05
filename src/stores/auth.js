import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";
import {useRouter} from "vue-router";
export const useAuthStore = defineStore('auth', () =>{
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
  }

  return {
    getAuthToken,
    login
  };
})
