<script lang="ts" setup>
import {ref} from "vue";
import AppModal from './AppModal.vue';

const emits = defineEmits(['delete']);
defineProps<{
    leckerLog: any;
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
        <div v-if="leckerLog.updated_at" class="text-xs text-gray-500">zuletzt aktualisiert: {{ new Date(leckerLog.updated_at).toLocaleDateString() }}</div>
        <h1 class="text-lg font-bold pb-2">{{ leckerLog.name }}</h1>
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
