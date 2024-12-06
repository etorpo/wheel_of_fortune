import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";

export const usePlayersStore = defineStore('players', () =>{
  const isLoading = ref(false);
  const players = ref([]);
  const playersPerPage = ref(10);
  const getPlayers = async () => {
    isLoading.value = true;
    const response = await axiosInst.get('/admin/clients');
    players.value = response.data.data;
    playersPerPage.value = response.data.per_page;
    isLoading.value = false;
  };

  const addPlayer = async (name, ticketCode, city) => {
    const request = {
      name: name,
      ticket_code: ticketCode,
      city: city
    };

    isLoading.value = true;
    const response = await axiosInst.post('/admin/clients', request);
    players.value = response.data.data;
    isLoading.value = false;
  };

  const editPlayer = async (playerId, name, ticketCode, city) => {
    const request = {
      id: playerId,
      name: name,
      ticket_code: ticketCode,
      city: city
    };

    isLoading.value = true;
    const response = await axiosInst.put(`/admin/clients/${playerId}`, request);
    players.value = response.data.data;
    isLoading.value = false;
  };

  const downloadExcelFile = async () => {
    isLoading.value = true;
    await axiosInst.get(`/admin/clients/export`);
    isLoading.value = false;
  }

  return {
    isLoading,
    players,
    playersPerPage,
    getPlayers,
    addPlayer,
    editPlayer,
    downloadExcelFile
  };
})
