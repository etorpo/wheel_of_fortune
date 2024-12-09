<script setup>
import AppTable from "@/components/AppTable.vue";
import AppDrawer from "@/components/AppDrawer.vue";
import {usePlayersStore} from "@/stores/players.js";
import {ref} from "vue";

const playersStore = usePlayersStore();

const headers = ref([
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Имя', key: 'name', align: 'start' },
  { title: 'Билет №', key: 'ticket_code', align: 'start' },
  { title: 'Город', key: 'city', align: 'start' },
  { title: 'Сектор', key: 'group_id', align: 'start' },
  { title: 'Приз', key: 'product_name', align: 'start' },
  { title: 'Действия', key: 'actions', align: 'end', sortable: false },
])

onMounted(() => {
  playersStore.getPlayers();
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
