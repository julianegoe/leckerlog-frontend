<script lang="ts" setup>
import { useContentStore } from '../../store/content';
import FoodCard from '../../components/FoodCard.vue';
import AppEmptyState from '../../components/AppEmptyState.vue';
import useDisplayState from '../../composables/useDisplayState';

const content = useContentStore();
const { displayState } = useDisplayState();
</script>
<template>
    <div>
        <div v-if="displayState === 'HAS_DATA'" class="flex flex-col gap-4">
            <template v-for="(food, index) in content.getSortedFoodOrdered" :key="`${index}-${food.name}`">
                <FoodCard :menu-item="food.name" :rating="food.rating"
                    :file-name="food.image_path" :comment="food.comment" :date="food.ordered_at"
                    :restaurant-name="food.restaurant_name" :food-id="food.food_id" />
            </template>
        </div>
        <AppEmptyState v-else-if="displayState === 'NO_DATA'" />
    </div>
</template>