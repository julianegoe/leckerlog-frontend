<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import StarIcon from '../assets/icons/star-outline.svg?component'
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  foodId: number;
  menuItem: string;
  rating: number;
  fileName: string | null;
  comment?: string;
  date?: string;
  restaurantName?: string;
}>();

const url = ref();


const localeDateString = computed(() => {
  if (props.date) {
    return new Date(props.date).toLocaleDateString();
  }
});

</script>
<template>
  <div @click="$router.push({ name: 'Details', params: { foodId } })"
    class="grid grid-cols-3 border-2 bg-white border-black shadow-brutal rounded-md">
    <div class="h-48 col-span-2 flex flex-col gap-2 p-2">
      <p class="text-xs">{{ localeDateString }}</p>
      <h1 class="text-lg font-bold">{{ menuItem }}</h1>
      <p class="text-xs line-clamp-1">{{ restaurantName }}</p>
      <div class="flex gap-1">
        <StarIcon fill="#8affdc" class="h-6 w-6" v-for="n in rating" :key="`${n}-star-rating`" />
      </div>
      <p class="text-xs line-clamp-2">"{{ comment }}"</p>
    </div>
      <!-- <img class="h-48 col-span-1 object-cover object-center" v-if="url" :src="url" :alt="menuItem">
      <div v-else-if="!url" class="rounded-r-md col-span-1 h-48 border-l-2 border-black bg-gray-200 animate-pulse"></div> -->
  </div>

</template>
