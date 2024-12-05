import { defineStore } from 'pinia'
import axiosInst from "@/axios.instance.js";
import {useRouter} from "vue-router";
export const useWheelStore = defineStore('wheel', () =>{
  const giftSectors = ref([]);
  const players = ref([]);
  const winner = ref({});
  const isLoading = ref(false);
  const selectedPlayer = ref(null);

  const getWheelData = async () => {
    isLoading.value = true;
    const response = await axiosInst.get('/site');
    giftSectors.value = response.data.sectors.map(sector => {
      return {
        id: sector.id,
        value: sector.id,
        bgColor: sector.color
      }
    });
    isLoading.value = false;
  };

  const getPlayers = async () => {
    isLoading.value = true;
    const response = await axiosInst.get('/clients');
    players.value = response.data.map(player => {
      return {
        title: player.name,
        value: player.id,
      }
    });
    isLoading.value = false;
  };

  const spin = async () => {
    const request = {
      client_id: selectedPlayer.value
    }
    const response = await axiosInst.post('/site/spin', request);
    winner.value = response.data.sector.id;
  }

  return {
    giftSectors,
    players,
    winner,
    getWheelData,
    isLoading,
    getPlayers,
    selectedPlayer,
    spin
  };
})
