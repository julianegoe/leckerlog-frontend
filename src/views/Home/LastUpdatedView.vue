<script lang="ts" setup>
import { useContentStore } from '../../store/content';
import FoodCard from '../../components/FoodCard.vue';
import AppEmptyState from '../../components/AppEmptyState.vue';

const content = useContentStore();

</script>
<template>
    <div class="flex flex-col gap-2">
        <template v-for="(food, index) in content.getLastUpdated" :key="`${index}-${food.name}`">
            <FoodCard :menu-item="food.name" :rating="food.rating" :file-name="food.image_path" :comment="food.comment" :date="food.ordered_at" :restaurant-name="food.restaurant_name"/>
        </template>
    </div>
    <AppEmptyState v-if="content.getLastUpdated.length === 0" />
</template>