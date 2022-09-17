<script lang="ts" setup>
import {ref} from "vue";
import { Leckerlog } from "../types/types";
import AppModal from './AppModal.vue';

const emits = defineEmits(['delete']);
const props = defineProps<{
    leckerLog: Leckerlog;
}>();

const showModal = ref(false);
const handleDelete = () => {
  emits('delete');
  showModal.value = false;
}
</script>
<template>
  <div class="flex justify-between">
    <Transition name="jump">
      <AppModal v-if="showModal" @delete="handleDelete" @close="showModal = false" text="Willst du dieses Restaurant mit allen Gerichten endgültig löschen?" />
    </Transition>
      <div>
        <div v-if="leckerLog.date_updated" class="text-xs text-gray-500">zuletzt aktualisiert: {{ new Date(leckerLog.date_updated).toLocaleDateString() }}</div>
        <h1 class="text-3xl font-bold py-2">{{ leckerLog.name }}</h1>
        <div>{{ leckerLog.cuisine }}</div>
      </div>
  </div>
</template>
<style scoped>
.jump-enter-active,
.jump-leave-active {
  transition: transform 0.5s ease;
}

.jump-enter-from,
.jump-leave-to {
  transform: translateY(200%);
}

</style>
