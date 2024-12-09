<script setup>
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import {useDrawerStore} from "@/stores/drawer.js";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const drawerStore = useDrawerStore();
</script>

<template>
  <header>
    <v-app-bar :elevation="2" class="px-4">

      <v-app-bar-nav-icon
        v-if="route.path.includes('/admin')"
        variant="text"
        @click.stop="drawerStore.isDrawerOpen = !drawerStore.isDrawerOpen"
      ></v-app-bar-nav-icon>

      <RouterLink class="text-decoration-none text-white ml-4" to="/">
        <v-app-bar-title>Колесо фортуны</v-app-bar-title>
      </RouterLink>

      <template
        v-if="authStore.getAuthToken()"
        v-slot:append
      >
        <v-btn
          v-if="!route.path.includes('/admin')"
          prepend-icon="mdi-account"
          variant="outlined"
          @click="router.push('/admin/clients')"
        >
          Админ панель
        </v-btn>

        <v-btn
          v-else
          variant="outlined"
          @click="router.push('/')"
        >
          На главную
        </v-btn>
      </template>
    </v-app-bar>
  </header>
</template>

<style scoped lang="scss">

</style>
