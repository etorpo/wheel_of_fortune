<script setup>
import {ref, reactive, computed, watch, onMounted} from 'vue'
import {usePlayersStore} from "@/stores/players.js";
import {useCityStore} from "@/stores/city.js";
import {useSectorsStore} from "@/stores/sectors.js";
const sectorsStore = useSectorsStore();

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
  color: '',
  products_count: '',
})

const newItem = reactive({
  id: '',
  color: '',
  products_count: '',
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Добавьте сектор' : 'Изменить цвет сектора'
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
    await sectorsStore.addSector(newItem.color);
  } else {
    await sectorsStore.editSector(editedItem.id, editedItem.color);
  }
  close();
  await sectorsStore.getSectors();
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    :items-per-page="itemsPerPage"
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
          max-width="380px"
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
                <v-color-picker
                  v-model="editedItem.color"
                  class="w-100"
                  elevation="10"
                />
              </v-container>

              <v-container v-else>
                <v-color-picker
                  v-model="newItem.color"
                  class="w-100"
                  elevation="10"
                />
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
    <template v-slot:item.id="{item}">
      <RouterLink
        :to="`/admin/sectors/${item.id}`"
        class="text-primary"
      >
        {{item.id}}
      </RouterLink>
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
      <v-card-title v-if="!sectorsStore.isLoading">Список секторов пуст</v-card-title>
      <v-progress-circular v-else class="my-10" indeterminate size="100" width="10" />
    </template>
  </v-data-table>
</template>

<style scoped lang="scss">

</style>
