<script lang="ts" setup>
import { useContentStore } from '../../store/content';
import FoodCard from '../../components/FoodCard.vue';
import AppEmptyState from '../../components/AppEmptyState.vue';
import { useApi } from '../../composables/useApi';

const content = useContentStore();
const api = useApi()

const handleDelete = async (id: number) => {
  await api.deleteFoodOrdered(id);
  const leckerlog = await api.getLeckerlog();
  content.setLeckerlogs(leckerlog);
};

</script>
<template>
    <div>
        <div class="flex flex-col gap-2">
            <template v-for="(food, index) in content.getSortedFoodOrdered" :key="`${index}-${food.name}`">
                <FoodCard @delete="handleDelete(food.food_id)" :menu-item="food.name" :rating="food.rating" :file-name="food.image_path"
                    :comment="food.comment" :date="food.ordered_at" :restaurant-name="food.restaurant_name" />
            </template>
        </div>
        <div v-if="api.status.value === 'LOADING'" class="flex flex-col gap-2 items-center justify-between m-2">
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse w-full h-40"></div>
        </div>
        <AppEmptyState v-else-if="api.status.value === 'SUCCESS' && content.getSortedFoodOrdered.length === 0" />
    </div>
</template>