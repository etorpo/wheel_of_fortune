import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";

export const useDrawerStore = defineStore('drawer', () =>{
  const isDrawerOpen = ref(true);
  return { isDrawerOpen };
})
