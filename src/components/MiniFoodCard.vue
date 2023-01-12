<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import StarIcon from '../assets/icons/star-outline.svg?component'
import { FoodOrdered } from '../types/types';
import Box from './globals/Box.vue';

defineProps<{
    foodOrdered: FoodOrdered;
}>()
</script>
<template>
    <Box>
        <div class="flex flex-col cursor-pointer">
            <RouterLink :to="{ name: 'Details', params: { foodId: foodOrdered.food_id }}">
                <span class="text-sm">{{ foodOrdered.date_updated }}</span>
                <h1 class="font-bold text-md">
                    {{ foodOrdered.name }}
                </h1>
                <div class="flex gap-1 mt-2">
                    <StarIcon fill="#8affdc" class="h-6 w-6" v-for="n in foodOrdered.rating"
                        :key="`${n}-star-rating`" />
                </div>
            </RouterLink>
        </div>
    </Box>
</template>