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

</script>
<template>
  <Transition name="jump">
    <AppModal v-if="showModal" @delete="handleDelete" @close="showModal = false"
      text="Willst du dieses Gericht endgültig löschen?" />
  </Transition>
  <div class="flex gap-2 flex-nowrap justify-between border-2 border-black">
    <div class="flex flex-col gap-2 p-2 w-2/3">
      <p class="text-xs">{{ localeDateString }}</p>
      <h1 class="text-xl font-bold">{{ menuItem }}</h1>
      <p class="text-xs">{{ restaurantName }}</p>
      <div class="flex gap-1">
        <StarIcon class="w-6 text-yellow-400" v-for="n in rating" :key="`${n}-star-rating`" />
      </div>
      <p>"{{ comment }}"</p>
    </div>
    <div>
      <img class="object-fit border-l-2 border-black" :src="result.imageUrl.value" :alt="menuItem">
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
