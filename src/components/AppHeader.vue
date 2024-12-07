<script setup>
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
</script>

<template>
  <header>
    <v-app-bar :elevation="2" class="px-4">

      <RouterLink class="text-decoration-none text-white" to="/">
        <v-app-bar-title>Крути барабан</v-app-bar-title>
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
