<script lang="ts" setup>
import { computed } from "vue";
import BackIcon from '../assets/icons/chevron-left.svg';
import AppHeader from "../components/AppHeader.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import FoodCard from "../components/FoodCard.vue";
import { useApi } from "../composables/useApi";
import { Leckerlog } from "../types/types";
import { useContentStore } from "../store/content";


const api = useApi();
const data = useContentStore();

const props = defineProps<{
  cuisine: string;
}>()

const displayRestaurants = computed<Leckerlog[]>(() => {
  return data.leckerlogs.filter((restaurant: Leckerlog) => restaurant.cuisine === props.cuisine);
})

const handleDelete = async (id: number) => {
  await api.deleteFoodOrdered(id);
  const leckerlog = await api.getLeckerlog();
  data.setLeckerlogs(leckerlog);
};

</script>
<template>
  <div>
    <AppHeader>
      <div @click="$router.back()" class="cursor-pointer pr-2">
        <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
      </div>
      <div class="font-bold text-lg">{{ cuisine }}</div>
    </AppHeader>

    <template v-if="displayRestaurants !== null && displayRestaurants.length > 0">
      <div v-for="restaurant in displayRestaurants" :key="restaurant.restaurant_id"
        class="flex flex-col gap-6 m-auto p-2 mb-8">
        <RestaurantCard v-if="displayRestaurants.length > 0" @delete="handleDelete(restaurant.restaurant_id)"
          :lecker-log="restaurant" />
        <div class="w-full flex flex-row gap-4 overflow-x-scroll snap-x snap-mandatory scroll-smooth">
          <template v-for="food in restaurant.food_ordered" :key="food.food_id">
            <FoodCard @delete="handleDelete(food.food_id)" :menu-item="food.name" :rating="food.rating"
              :comment="food.comment" :date="food.ordered_at" :file-name="food.image_path" />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
