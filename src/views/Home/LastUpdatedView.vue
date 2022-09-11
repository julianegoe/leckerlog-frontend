<script lang="ts" setup>
import { useContentStore } from '../../store/content';
import FoodCard from '../../components/FoodCard.vue';
import AppEmptyState from '../../components/AppEmptyState.vue';

defineProps<{
    status: 'LOADING' | 'IDLE' | 'SUCCESS' | 'ERROR';
}>()

const content = useContentStore();

</script>
<template>
    <div>
        <div class="flex flex-col gap-2">
            <template v-for="(food, index) in content.getLastUpdated" :key="`${index}-${food.name}`">
                <FoodCard :menu-item="food.name" :rating="food.rating" :file-name="food.image_path"
                    :comment="food.comment" :date="food.ordered_at" :restaurant-name="food.restaurant_name" />
            </template>
        </div>
        <div v-if="status === 'LOADING'" class="flex flex-col gap-2 items-center justify-between m-2">
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
        </div>
        <AppEmptyState v-else-if="status === 'SUCCESS' && content.getLastUpdated.length === 0" />
    </div>
</template>