<script setup>
import AppTable from "@/components/AppTable.vue";
import AppDrawer from "@/components/AppDrawer.vue";
import {usePlayersStore} from "@/stores/players.js";
import {ref} from "vue";
import {useCityStore} from "@/stores/city.js";
const playersStore = usePlayersStore();
const citiesStore = useCityStore();

const headers = ref([
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Имя', key: 'name', align: 'end' },
  { title: 'Билет №', key: 'ticket_code', align: 'end' },
  { title: 'Город', key: 'city', align: 'end' },
  { title: 'Сектор', key: 'group_id', align: 'end' },
  { title: 'Приз', key: 'product_name', align: 'end' },
  { title: 'Действия', key: 'actions', align: 'end', sortable: false },
])

onMounted(() => {
  playersStore.getPlayers();
  citiesStore.getCities();
})
</script>

<template>
  <app-drawer/>
  <app-table
    title="Участники"
    :headers="headers"
    :items="playersStore.players"
    :items-per-page="playersStore.playersPerPage"
  />
</template>

<style scoped lang="sass">

</style>
