<script setup>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import {useRoute} from "vue-router";
import {useCityStore} from "@/stores/city.js";
const route = useRoute();
const citiesStore = useCityStore();

onMounted(() => {
  citiesStore.getCities();
})
</script>

<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style scoped>

</style>
