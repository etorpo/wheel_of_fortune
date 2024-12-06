<script setup>
const props = defineProps({
  isOpen: Boolean
})
</script>

<template>
  <v-dialog
    v-model="isOpen"
    max-width="500px"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="mb-2"
        color="primary"
        dark
        v-bind="props"
      >
        Добавить
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.name"
                label="Dessert name"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.calories"
                label="Calories"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.fat"
                label="Fat (g)"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.carbs"
                label="Carbs (g)"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="editedItem.protein"
                label="Protein (g)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
