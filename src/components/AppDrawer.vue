<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {useDrawerStore} from "@/stores/drawer.js";
const authStore = useAuthStore();

const drawerStore = useDrawerStore();
</script>

<template>
  <v-navigation-drawer v-model="drawerStore.isDrawerOpen">
    <v-list-item link to="/admin/clients" title="Участники"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link to="/admin/sectors" title="Сектор/Призы"></v-list-item>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="primary" block @click="authStore.logout()">
          Выйти
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">

</style>
