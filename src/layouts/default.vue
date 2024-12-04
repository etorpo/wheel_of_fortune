<template>
  <v-app>
    <AppHeader/>
    <v-main class="my-container">
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<style scoped>
.my-container {
  margin: 0 auto;
}
</style>
