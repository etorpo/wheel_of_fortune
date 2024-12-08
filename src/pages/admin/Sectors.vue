<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import AppSectorsTable from "@/components/AppSectorsTable.vue";
import {ref} from "vue";
import {useCityStore} from "@/stores/city.js";
import {useSectorsStore} from "@/stores/sectors.js";
const sectorsStore = useSectorsStore();

const headers = ref([
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Цвет', key: 'color', align: 'start' },
  { title: 'Кол-во призов', key: 'products_count', align: 'start' },
  { title: 'Действия', key: 'actions', align: 'end', sortable: false },
])

onMounted(() => {
  sectorsStore.getSectors();
})
</script>

<template>
  <app-drawer/>
  <app-sectors-table
    title="Секторы"
    :headers="headers"
    :items="sectorsStore.sectors"
    :items-per-page="15"
  />
</template>

<style scoped lang="sass">

</style>
