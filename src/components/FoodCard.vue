<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import StarIcon from '../assets/icons/star-outline.svg?component'
import { computed, onMounted, ref } from 'vue';
import { FoodOrderedExtended } from '../types/types';
import { useStorage } from '@vueuse/core';

const props = defineProps<{
  food: FoodOrderedExtended,
}>();

const jwtToken = useStorage('auth', '', localStorage);


const localeDateString = computed(() => {
  if (props.food.ordered_at) {
    return new Date(props.food.ordered_at).toLocaleDateString();
  }
});

const imageUrl = ref('');
onMounted(async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/download/?filename=${props.food.image_path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken.value}`
        }
        });
        const blob = await response.blob();
        imageUrl.value = URL.createObjectURL(blob)
    } catch (error) {
        console.log(error)
    }
})

</script>
<template>
  <div @click="$router.push({ name: 'Details', params: { foodId: food.food_id } })"
    class="grid grid-cols-3 border-2 bg-white border-black shadow-brutal rounded-md">
    <div class="h-48 col-span-2 flex flex-col gap-2 p-2">
      <p class="text-xs">{{ localeDateString }}</p>
      <h1 class="text-lg font-bold">{{ food.name }}</h1>
      <p class="text-xs line-clamp-1">{{ food.restaurant_name }}, {{ food.cuisine }}</p>
      <div class="flex gap-1">
        <StarIcon fill="#8affdc" class="h-6 w-6" v-for="n in food.rating" :key="`${n}-star-rating`" />
      </div>
      <p class="text-xs line-clamp-2">"{{ food.comment }}"</p>
    </div>
      <img class="h-48 col-span-1 object-cover object-center" v-if="imageUrl" :src="imageUrl" :alt="food.name">
      <div v-else-if="!imageUrl" class="rounded-r-md col-span-1 h-48 border-l-2 border-black bg-gray-200 animate-pulse"></div>
  </div>

</template>
