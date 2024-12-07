import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";

export const useCityStore = defineStore('city', () => {
  const cities = ref([]);

  const getCities = async () => {
    const response = await axiosInst.get('/cities');
    cities.value = response.data.map(city => {
      return {
        title: city.name,
        value: city.id,
      };
    });
  }

  return {
    cities,
    getCities,
  };
})
