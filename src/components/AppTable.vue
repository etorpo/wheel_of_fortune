<script setup>
import {ref, reactive, computed, watch, onMounted} from 'vue'
import {usePlayersStore} from "@/stores/players.js";
import {useCityStore} from "@/stores/city.js";
const playersStore = usePlayersStore();
const citiesStore = useCityStore();

const dialog = ref(false)

const props = defineProps({
  title: String,
  headers: Array,
  items: Array,
  itemsPerPage: Number
})

const editedIndex = ref(-1)

const editedItem = reactive({
  id: '',
  name: '',
  ticket_code: '',
  city: null,
})

const newItem = reactive({
  name: '',
  ticket_code: '',
  city: null,
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Добавить' : 'Редактировать'
})

const itemsTransform = computed(() => {
  return props.items?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      ticket_code: item.ticket_code,
      city: item.city.name,
      group_id: item.group_id,
      product_name: item.product_name
    }
  })
})

watch(dialog, (val) => {
  if (!val) close()
})

function editItem(id) {
  const item = props.items.find((item) => item.id === id);
  editedIndex.value = 1;
  Object.assign(editedItem, item);
  dialog.value = true;
}

function close() {
  dialog.value = false
  editedIndex.value = -1;
}

const save = async () => {
  if (editedIndex.value === -1) {
    await playersStore.addPlayer(newItem.name, newItem.ticket_code, newItem.city);
  } else {
    await playersStore.editPlayer(editedItem.id, editedItem.name, editedItem.ticket_code, editedItem.city.id);
  }
  close();
  await playersStore.getPlayers();
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="itemsTransform"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    :items-per-page="10"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          @click="playersStore.downloadExcelFile()"
          class="mb-2"
          color="white"
          variant="outlined"
          dark
          v-bind="props"
        >
          Скачать Excel
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2 ml-5"
              color="primary"
              variant="outlined"
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

              <v-container v-if="editedIndex !== -1">

                <v-text-field
                  v-model="editedItem.name"
                  label="Имя"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.ticket_code"
                  label="Билет"
                  variant="outlined"
                ></v-text-field>
                <v-autocomplete
                  class="wheel-players"
                  v-model="editedItem.city.id"
                  label="Город"
                  :items="citiesStore.cities"
                  variant="outlined"
                  prepend-inner-icon="mdi-magnify"
                >
                </v-autocomplete>
              </v-container>

              <v-container v-else>
                <v-text-field
                  v-model="newItem.name"
                  label="Имя"
                  variant="outlined"
                ></v-text-field>
                <v-text-field
                  v-model="newItem.ticket_code"
                  label="Билет"
                  variant="outlined"
                ></v-text-field>
                <v-autocomplete
                  class="wheel-players"
                  v-model="newItem.city"
                  label="Город"
                  :items="citiesStore.cities"
                  variant="outlined"
                  prepend-inner-icon="mdi-magnify"
                >
                </v-autocomplete>
              </v-container>

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="outlined"
                @click="close"
              >
                Отменить
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="outlined"
                @click="save"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item.id)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-card-title v-if="!playersStore.isLoading">Список участников пуст</v-card-title>
      <v-progress-circular v-else class="my-10" indeterminate size="100" width="10" />
    </template>
  </v-data-table>
</template>

<style scoped lang="scss">

</style>
