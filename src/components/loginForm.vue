<script setup>
import { ref } from 'vue'
import {useAuthStore} from "@/stores/auth.js";
import {useCityStore} from "@/stores/city.js";
const useAuth = useAuthStore();
const citiesStore = useCityStore();
const props = defineProps({
  register: Boolean
});

const form = ref(false)
const email = ref(null)
const password = ref(null)
const userName = ref(null);
const city = ref(null);
const loading = ref(false)

const visiblePassword = ref(false);

const onSubmit = () => {
  if (!form.value) return

  loading.value = true

  setTimeout(() => {
    if (props.register) {
      useAuth.register({
        email: email.value,
        password: password.value,
        name: userName.value,
        city_id: city.value
      });
    } else {
      useAuth.login(email.value, password.value);
    }
    loading.value = false
  }, 450)
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
        v-if="register"
        v-model="userName"
        :readonly="loading"
        :rules="[required]"
        density="compact"
        placeholder="Имя пользователя"
        prepend-inner-icon="mdi-account-box"
        variant="outlined"
      ></v-text-field>

      <v-autocomplete
        v-if="register"
        v-model="city"
        class="wheel-players"
        density="compact"
        label="Город"
        :items="citiesStore.cities"
        variant="outlined"
        prepend-inner-icon="mdi-city"
      >
      </v-autocomplete>

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

      <RouterLink v-if="!register" class="form-link" to="/register">
        Зарегистрироваться
      </RouterLink>

      <v-btn
        v-if="register"
        :disabled="!form"
        :loading="loading"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
        block
      >
        Зарегистрироваться
      </v-btn>

      <v-btn
        v-else
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

      <div v-if="useAuth.authError" class="form-error">
        {{ useAuth.authError }}
      </div>

    </v-form>
  </v-card>
</template>

<style scoped lang="scss">
.form-link {
  display: inline-block;
  margin-bottom: 12px;
  text-decoration: none;
  color: darkgray;

  transition: color .24s;

  &:hover {
    color: var(--v-primary-base);
  }
}

.form-error {
  color: #f3223c;
  padding-top: 12px;
}

</style>
