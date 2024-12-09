import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";

export const useSectorsStore = defineStore('sectors', () =>{
  const isLoading = ref(false);
  const sectors = ref([]);
  const sectorsPerPage = ref(10);
  const getSectors = async () => {
    isLoading.value = true;
    const response = await axiosInst.get('/admin/groups');
    sectors.value = response.data;
    isLoading.value = false;
  };

  const addSector = async (color) => {
    isLoading.value = true;
    await axiosInst.post('/admin/groups', { color: color });
    isLoading.value = false;
  };

  const editSector = async (sectorId, color) => {
    isLoading.value = true;
    await axiosInst.put(`/admin/groups/${sectorId}`, {color: color});
    isLoading.value = false;
  };

  const downloadExcelFile = async () => {
    isLoading.value = true;
    const response = await axiosInst.get(`/admin/products/export`, {responseType: 'blob'});
    const blob = new Blob([response.data], { type: response.data.type });
    const url = window.URL.createObjectURL(blob);
    let fileName = 'Отчет Excel';

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Устанавливаем имя файла
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
    isLoading.value = false;
  };

  return {
    isLoading,
    sectors,
    getSectors,
    editSector,
    addSector,
    downloadExcelFile
  };
})
