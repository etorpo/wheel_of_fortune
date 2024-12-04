<script setup>
import { ref } from 'vue'
import {useAuthStore} from "@/stores/auth.js";
const useAuth = useAuthStore();

const form = ref(false)
const email = ref(null)
const password = ref(null)
const loading = ref(false)

const visiblePassword = ref(false);

const onSubmit = () => {
  if (!form.value) return

  loading.value = true

  setTimeout(() => {
    useAuth.login(email.value, password.value);
    loading.value = false
  }, 2000)
}

const required = (v) => {
  return !!v || 'Поле обязательно для заполнения'
}
</script>

<template>
  <v-card class="mx-auto px-6 py-8" width="450">
    <v-form
      v-model="form"
      @submit.prevent="onSubmit"
    >
      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        density="compact"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visiblePassword ? 'text' : 'password'"
        density="compact"
        placeholder="Введите пароль"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visiblePassword = !visiblePassword"
      ></v-text-field>

      <v-btn
        :disabled="!form"
        :loading="loading"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
        block
      >
        Войти
      </v-btn>
    </v-form>
  </v-card>
</template>
