<script setup>
import {FortuneWheel} from "vue3-fortune-wheel";
const gift = ref(2);
const wheel = ref(null);
const data = ref([
  { id: 1, value: 'Sector 1', bgColor: '#7d7db3', color: '#ffffff' },
  { id: 2, value: 'Sector 2', bgColor: '#ffffff', color: '#000000' }
])
// Optional: Center image
const logo = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png',
  width: 100,
  height: 120
};
const hasMiddleCircle = true;
const done = result => {
  console.log('Spin completed:', result)
};
</script>

<template>
  <FortuneWheel
    ref="wheel"
    v-model="gift"
    :middle-circle="hasMiddleCircle"
    :img-params="logo"
    :data="data"
    @done="done"
  />
</template>

