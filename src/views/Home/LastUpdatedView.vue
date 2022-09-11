<script lang="ts" setup>
import { FoodOrdered, LastUpdatedFood } from '../../types/types';
import AppEmptyState from '../../components/AppEmptyState.vue';
import { useContentStore } from '../../store/content';
import { computed } from 'vue';
import FoodCard from '../../components/FoodCard.vue';

const content = useContentStore();

const last_updated = computed<LastUpdatedFood[]>(() => {
    return content.getLastUpdated();
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <template v-for="(food, index) in last_updated" :key="`${index}-${food.name}`">
            <FoodCard :menu-item="food.name" :rating="food.rating" :file-name="food.image_path" :comment="food.comment" :date="food.ordered_at" :restaurant-name="food.restaurant_name"/>
        </template>
    </div>
</template>