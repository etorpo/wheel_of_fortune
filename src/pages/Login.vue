<script setup>

import LoginForm from "@/components/loginForm.vue";
</script>

<template>
  <div class="my-container">
    <h1 class="title">Войти</h1>
    <login-form></login-form>
  </div>
</template>

<style scoped lang="scss">
.title {
  padding-bottom: 12px;
  width: 450px;
  margin: 60px auto 0 auto;
}

.my-container {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
