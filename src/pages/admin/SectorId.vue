<script setup>
import AppDrawer from "@/components/AppDrawer.vue";
import AppSectorsTable from "@/components/AppSectorsTable.vue";
import {ref} from "vue";
import {usePrizesStore} from "@/stores/prizes.js";
import {useRoute} from "vue-router";
import AppPrizeTable from "@/components/AppPrizeTable.vue";
import {useSectorsStore} from "@/stores/sectors.js";

const route = useRoute();
const prizesStore = usePrizesStore();
const sectorsStore = useSectorsStore();

const headers = ref([
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Название', key: 'name', align: 'start' },
  { title: 'Картинка', key: 'image', align: 'start' },
  { title: 'Количество', key: 'count', align: 'start', sortable: false },
  { title: 'Номер сектора', key: 'sectorsIds', align: 'start', sortable: false },
  { title: 'Действия', key: 'actions', align: 'end', sortable: false },
]);

onMounted(() => {
  prizesStore.getPrizes(route.params.id);
  sectorsStore.getSectors();
});
</script>

<template>
  <app-drawer/>
  <app-prize-table
    title="Призы"
    :headers="headers"
    :items="prizesStore.prizes"
    :items-per-page="15"
  />
</template>

<style scoped lang="sass">

</style>
