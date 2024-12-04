<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <header>
    <v-app-bar :elevation="2" class="px-4">

      <RouterLink class="text-decoration-none text-white" to="/">
        <v-app-bar-title>Колесо Удачи Элит Трейд</v-app-bar-title>
      </RouterLink>

      <template v-slot:append>
        <v-btn
          append-icon="mdi-login"
          variant="outlined"
          @click="router.push('/login')"
        >
          Войти
        </v-btn>
      </template>
    </v-app-bar>
  </header>
</template>

<style scoped lang="scss">

</style>
