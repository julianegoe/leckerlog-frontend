<script lang="ts" setup>
import StarIcon from '../assets/icons/star.svg'
import { computed, ref, watch } from 'vue';
import TrashIcon from '../assets/icons/trash.svg';
import AppModal from './AppModal.vue';
import { useFileDownload } from '../composables/useFileDownload';

const props = defineProps<{
  menuItem: string;
  rating: number;
  fileName: string | null;
  comment?: string;
  date?: string;
  restaurantName?: string;
}>();

const emits = defineEmits(['delete']);

const result = useFileDownload(props.fileName);

const localeDateString = computed(() => {
  if (props.date) {
    return new Date(props.date).toLocaleDateString();
  }
});

const showModal = ref(false);
const handleDelete = () => {
  emits('delete');
  showModal.value = false;
}

const handleMove = () => window.alert('move event detected')
</script>
<template>
  <div @touchmove="handleMove" class="flex justify-between items-center rounded-sm gap-4 p-4 border border-black">
    <Transition name="jump">
      <AppModal v-if="showModal" @delete="handleDelete" @close="showModal = false"
        text="Willst du dieses Gericht endgültig löschen?" />
    </Transition>
    <div>
      <ul>
        <li>
          <div v-if="date" class="text-xs">{{ localeDateString }}</div>
          <div class="font-bold text-lg">{{ menuItem }}</div>
          <div v-if="restaurantName" class="text-xs">{{ restaurantName }}</div>
        </li>
        <li>
          <div class="flex pt-2">
            <StarIcon class="w-6" v-for="n in rating" :key="`${n}-star-rating`" />
          </div>
        </li>
        <li>
          <div v-if="comment" class="pt-2">"{{ comment }}"</div>
        </li>
      </ul>
    </div>
    <div class="w-1/2">
      <img v-if="result.status.value === 'SUCCESS' && fileName !== null"  class="object-fill" :src="result.imageUrl.value" :alt="menuItem" />
      <div v-else-if="result.status.value === 'LOADING'" class="w-32 aspect-square bg-gray-100 animate-pulse"></div>
    </div>
    <div class="self-start flex flex-col gap-y-4 cursor-pointer">
      <TrashIcon @click="showModal = true" class="w-8 text-gray-700" />
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
