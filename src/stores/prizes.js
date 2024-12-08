import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";

export const usePrizesStore = defineStore('prizes', () =>{
  const isLoading = ref(false);
  const prizes = ref([]);
  const prizesPerPage = ref(10);
  const getPrizes = async (sectorId) => {
    isLoading.value = true;
    const response = await axiosInst.get(`/admin/groups/${sectorId}/products`);
    prizes.value = response.data;
    isLoading.value = false;
  };

  const addPrize = async (request) => {
    isLoading.value = true;
    await axiosInst.post('/admin/products', request);
    isLoading.value = false;
  };

  const deletePrize = async (prizeId) => {
    isLoading.value = true;
    await axiosInst.delete(`/admin/products/${prizeId}`);
    isLoading.value = false;
  };
  //
  // const editSector = async (sectorId, color) => {
  //   isLoading.value = true;
  //   await axiosInst.put(`/admin/groups/${sectorId}`, {color: color});
  //   isLoading.value = false;
  // };

  return {
    isLoading,
    prizes,
    getPrizes,
    addPrize,
    deletePrize
  };
})
