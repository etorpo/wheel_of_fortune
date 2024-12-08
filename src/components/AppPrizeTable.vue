<script setup>
import {ref, reactive, computed, watch, onMounted} from 'vue'
import {usePlayersStore} from "@/stores/players.js";
import {useCityStore} from "@/stores/city.js";
import {useSectorsStore} from "@/stores/sectors.js";
import {usePrizesStore} from "@/stores/prizes.js";
import {useRoute} from "vue-router";
const sectorsStore = useSectorsStore();
const prizeStore = usePrizesStore();
const route = useRoute();
const dialog = ref(false)

const props = defineProps({
  title: String,
  headers: Array,
  items: Array,
  itemsPerPage: Number
})

const editedIndex = ref(-1)

const editedItem = reactive({
  id: null,
  name: '',
  code: '',
  count: null,
  image: null,
  sectorsId: null,
})

const newItem = reactive({
  name: '',
  code: '',
  count: null,
  image: null,
  sectorsId: null,
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Добавить приз' : 'Редактировать'
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

const formatSectors = computed(() => {
  return sectorsStore.sectors.map(sector => {
    return {
      title: sector.id,
      value: sector.id
    }
  })
})

const save = async () => {
  if (editedIndex.value === -1) {
    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('code', newItem.code);
    formData.append('count', newItem.count);
    formData.append('image', newItem.image);
    formData.append('groups', newItem.sectorsId);
    await prizeStore.addPrize(formData);
  } else {
    await sectorsStore.editSector(editedItem.id, editedItem.color);
  }
  close();
  await sectorsStore.getSectors();
}

const deleteItem = async (id) => {
  await prizeStore.deletePrize(id);
  await prizeStore.getPrizes(route.params.id);
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
        <RouterLink class="text-white pl-2" to="/admin/sectors">
          <v-btn
            icon="mdi-arrow-left"
          />
        </RouterLink>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

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
                  label="Название"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.code"
                  label="Код приза"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="editedItem.count"
                  label="Количество"
                  variant="outlined"
                ></v-text-field>

                <v-autocomplete
                  class="wheel-players"
                  chips
                  multiple
                  v-model="editedItem.sectorsId"
                  label="Выбор номера сектора"
                  :items="formatSectors"
                  variant="outlined"
                >
                </v-autocomplete>

                <v-file-input
                  v-model="editedItem.image"
                  label="Картинка приза"
                  variant="outlined"
                  max-width="200"
                />

              </v-container>

              <v-container v-else>

                <v-text-field
                  v-model="newItem.name"
                  label="Название"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="newItem.code"
                  label="Код приза"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="newItem.count"
                  label="Количество"
                  variant="outlined"
                ></v-text-field>

                <v-autocomplete
                  class="wheel-players"
                  chips
                  multiple
                  v-model="newItem.sectorsId"
                  label="Выбор номера сектора"
                  :items="formatSectors"
                  variant="outlined"
                >
                </v-autocomplete>

                <v-file-input
                  v-model="newItem.image"
                  label="Картинка приза"
                  variant="outlined"
                  max-width="200"
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
    <template v-slot:item.image="{item}">
      <img class="table-image" :src="item.image" alt="">
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item.id)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        class="me-2"
        size="small"
        @click="deleteItem(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-card-title v-if="!sectorsStore.isLoading">Список секторов пуст</v-card-title>
      <v-progress-circular v-else class="my-10" indeterminate size="100" width="10" />
    </template>
  </v-data-table>
</template>

<style scoped lang="scss">
.table-image {
  padding: 12px 0px;
  max-width: 200px;
}
</style>
