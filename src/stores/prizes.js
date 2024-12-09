import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";

export const usePrizesStore = defineStore('prizes', () =>{
  const isLoading = ref(false);
  const prizes = ref([]);
  const prizesPerPage = ref(10);
  const getPrizes = async (sectorId) => {
    isLoading.value = true;
    const response = await axiosInst.get(`/admin/groups/${sectorId}/products`);
    prizes.value = response.data.map(prize => {
      return {
        id: prize.id,
        name: prize.name,
        code: prize.code,
        count: prize.count,
        image: prize.image,
        sectorsIds: prize.groups.map(group => group.id)
      }
    });
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

  const editPrize = async (id, request) => {
    isLoading.value = true;
    await axiosInst.post(`/admin/products/${id}`, request);
    isLoading.value = false;
  };

  return {
    isLoading,
    prizes,
    getPrizes,
    addPrize,
    deletePrize,
    editPrize
  };
})
