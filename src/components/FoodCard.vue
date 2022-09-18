<script lang="ts" setup>
import gsap from 'gsap'
import StarIcon from '../assets/icons/star-outline.svg'
import { computed, onMounted, ref } from 'vue';
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

const result = useFileDownload(props.fileName, 'thumbnail');

const localeDateString = computed(() => {
  if (props.date) {
    return new Date(props.date).toLocaleDateString();
  }
});

</script>
<template>
  <div @click="$router.push({ name: 'Details', params: { foodId } })"  class="flex flex-shrink-1 justify-between border-2 bg-white border-black shadow-brutal rounded-md">
    <div class="flex flex-col gap-2 p-2">
      <p class="text-xs">{{ localeDateString }}</p>
      <h1 class="text-xl font-bold">{{ menuItem }}</h1>
      <p class="text-xs">{{ restaurantName }}</p>
      <div class="flex gap-1">
        <StarIcon fill="#8affdc" class="h-6 w-6" v-for="n in rating" :key="`${n}-star-rating`" />
      </div>
      <p class="line-clamp-2">"{{ comment }}"</p>
    </div>
    <img v-if="result.status.value === 'SUCCESS'"
      class="rounded-r-md aspect-[3/4] max-h-48 object-cover object-center border-l-2 border-black"
      :src="result.imageUrl.value" :alt="menuItem">
    <div v-else-if="result.status.value === 'LOADING'"
      class="rounded-r-md aspect-[3/4] h-48 border-l-2 border-black bg-gray-200 animate-pulse"></div>
  </div>

</template>
