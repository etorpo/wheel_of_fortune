<script setup>
import {FortuneWheel} from "vue3-fortune-wheel";

const gift = ref(3);
const wheel = ref(null);
const data = ref([
  { id: 1, value: 'Sector1', bgColor: '#e71b1b'},
  { id: 2, value: 'Sector2', bgColor: '#ffffff'},
  { id: 3, value: 'Sector3', bgColor: '#c5c425'},
  { id: 4, value: 'Sector4', bgColor: '#2d1fa6'},
  { id: 5, value: 'Sector5', bgColor: '#2bd378'},
])

const logo = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png',
  width: 100,
  height: 120
};
const hasMiddleCircle = true;

const spin = () => {
  wheel.value?.spin();
}

const done = result => {
  console.log('Spin completed:', result)
};

onMounted(() => {
  spin();
})
</script>

<template>
  <div class="wheel-wrapper">
    <div>
      <v-autocomplete
        label="Выберите учасника"
        :items="['user1', 'user2', 'user3']"
        variant="outlined"
      >
      </v-autocomplete>
    </div>
    <FortuneWheel
      ref="wheel"
      v-model="gift"
      :middle-circle="hasMiddleCircle"
      :img-params="logo"
      :data="data"
      @done="done"
      class="wheel"
    />
  </div>
</template>

<style scoped lang="scss">
.wheel-wrapper {
  display: block;
  align-items: flex-start;
  margin-top: 60px;
}

.wheel {

}
</style>

