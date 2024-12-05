<script setup>
import {FortuneWheel} from "vue3-fortune-wheel";
import {useWheelStore} from "@/stores/wheel.js";

const wheelStore = useWheelStore();
const wheel = ref(null);
const error = ref(false);
const winDialog = ref(false);

const spin = async () => {
  validateWheel();
  if (error.value) return;
  await wheelStore.spin();
  wheel.value?.spin();
}

const done = async () => {
  winDialog.value = true;
};

const validateWheel = () => {
  error.value = !wheelStore.selectedPlayer;
}

onMounted(async () => {
  await wheelStore.getWheelData();
  await wheelStore.getPlayers();
})
</script>

<template>
  <div class="my-container">
    <div class="loader" v-if="wheelStore.isLoading">
      <v-progress-circular indeterminate size="100" width="10" />
    </div>
    <div class="wheel-wrapper" v-else>
      <div>
        <v-autocomplete
          class="wheel-players"
          :error="error"
          :error-messages="error ? 'Необходимо выбрать учасника' : null"
          v-model="wheelStore.selectedPlayer"
          label="Выберите учасника"
          :items="wheelStore.players"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
        >
        </v-autocomplete>
      </div>
      <div class="position-relative">
        <FortuneWheel
          ref="wheel"
          v-model="wheelStore.winner"
          :middle-circle="false"
          :data="wheelStore.giftSectors"
          @done="async () => {
          await done();
          $confetti.start();
        }"
          class="wheel"
        />
        <v-btn
          class="spin-btn"
          color="black"
          size="80"
          icon="mdi-play"
          @click="spin"
        >
          <v-icon color="white" size="40"></v-icon>
        </v-btn>
      </div>
    </div>
    <v-dialog
      v-model="winDialog"
      opacity="0.12"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-candy-outline"
        text="Поздравляем с победой!"
        title="Вы выйграли!!!"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ура!"
            variant="outlined"
            @click="() => {
            winDialog = false;
            $confetti.stop()
          }"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="scss">
.my-container {
  max-width: 1440px;
  margin: 0 auto;
}
.wheel-wrapper {
  display: block;
  align-items: flex-start;
  margin-top: 60px;
}

.wheel-players {
  max-width: 500px;
  margin: 0 auto;
}

.wheel {
  height: auto !important;
}

.loader {
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spin-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

