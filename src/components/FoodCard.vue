<script lang="ts" setup>
import StarIcon from '../assets/icons/star-outline.svg'
import { computed, ref } from 'vue';
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

</script>
<template>
  <Transition name="jump">
    <AppModal v-if="showModal" @delete="handleDelete" @close="showModal = false"
      text="Willst du dieses Gericht endgültig löschen?" />
  </Transition>
  <div class="flex gap-2 flex-nowrap justify-between border-2 border-black shadow-brutal rounded-md">
    <div class="flex flex-col gap-2 p-2">
      <p class="text-xs">{{ localeDateString }}</p>
      <h1 class="text-xl font-bold">{{ menuItem }}</h1>
      <p class="text-xs">{{ restaurantName }}</p>
      <div class="flex gap-1">
        <StarIcon fill="#8affdc" class="h-8 w-8" v-for="n in rating" :key="`${n}-star-rating`" />
      </div>
      <p>"{{ comment }}"</p>
    </div>
    <img class="aspect-[3/4] max-h-48 object-scale-down object-center border-l-2 border-black" :src="result.imageUrl.value"
      :alt="menuItem">
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
