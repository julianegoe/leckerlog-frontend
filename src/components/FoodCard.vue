<script lang="ts" setup>
import gsap from 'gsap'
import StarIcon from '../assets/icons/star-outline.svg'
import { computed, onMounted, ref } from 'vue';
import TrashIcon from '../assets/icons/trash.svg';
import AppModal from './AppModal.vue';
import { useFileDownload } from '../composables/useFileDownload';

const props = defineProps<{
  foodId: number;
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

</script>
<template>
  <Transition name="jump">
    <AppModal v-if="showModal" @delete="handleDelete" @close="showModal = false"
      text="Willst du dieses Gericht endgültig löschen?" />
  </Transition>
  <div class="flex flex-shrink-1 justify-between border-2 bg-white border-black shadow-brutal rounded-md">
    <div class="pt-1 pl-1" @click="() => showModal = true">
      <TrashIcon class="w-4 h-4" />
    </div>
    <div @click="$router.push({ name: 'Details', params: { foodId } })" class="flex flex-col gap-2 p-2">
      <p class="text-xs">{{ localeDateString }}</p>
      <h1 class="text-xl font-bold">{{ menuItem }}</h1>
      <p class="text-xs">{{ restaurantName }}</p>
      <div class="flex gap-1">
        <StarIcon fill="#8affdc" class="h-6 w-6" v-for="n in rating" :key="`${n}-star-rating`" />
      </div>
      <p>"{{ comment }}"</p>
    </div>
    <img v-if="result.status.value === 'SUCCESS'"
      class="rounded-r-md aspect-[3/4] max-h-48 object-scale-down object-center border-l-2 border-black"
      :src="result.imageUrl.value" :alt="menuItem">
    <div v-else-if="result.status.value === 'LOADING'"
      class="rounded-r-md aspect-[3/4] h-48 border-l-2 border-black bg-gray-200 animate-pulse"></div>
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
