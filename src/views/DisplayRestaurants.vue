<script lang="ts" setup>
import { computed, onBeforeMount, ref, Ref } from "vue";
import BackIcon from '../assets/icons/chevron-left.svg';
import AppHeader from "../components/AppHeader.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import AppEmptyState from "../components/AppEmptyState.vue";
import FoodCard from "../components/FoodCard.vue";
import { useApi } from "../composables/useApi";
import { Leckerlog } from "../types/types";
import { useContentStore } from "../store/content";


const api = useApi();
const data = useContentStore();
const props = defineProps<{
  cuisine: string;
}>()

onBeforeMount(async () => {
  const leckerlog = await api.getLeckerlog();
  data.setLeckerlogs(leckerlog);
});

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
      <div class="pr-2">
        <RouterLink :to="{ name: 'Home' }">
          <BackIcon class="hover:transition-transform hover:scale-125 hover:ease-in" />
        </RouterLink>
      </div>
      <div class="font-bold text-lg">{{ cuisine }}</div>
    </AppHeader>
    <template v-if="false || displayRestaurants !== null && displayRestaurants.length > 0">
      <div v-for="restaurant in displayRestaurants" :key="restaurant.restaurant_id"
        class="flex flex-col gap-6 m-auto p-2 mb-8">
        <RestaurantCard v-if="displayRestaurants.length > 0" @delete="handleDelete(restaurant.restaurant_id)"
          :lecker-log="restaurant" />
        <div v-for="food in restaurant.food_ordered" :key="food.food_id">
          <FoodCard @delete="handleDelete(food.food_id)" :menu-item="food.name" :rating="food.rating"
            :comment="food.comment" :date="food.ordered_at || new Date().toLocaleDateString()"
            :file-name="food.image_path" />
        </div>
      </div>
    </template>
    <!--    Skeleton-->
    <div v-else-if="true">
      <div v-for="n in 3" :key="`restaurant-skeleton-${n}`" class="w-full h-48 bg-gray-200 animate-pulse mb-2"></div>
    </div>
    <AppEmptyState v-else-if="data.leckerlogs.length > 0 && displayRestaurants.length === 0" />
  </div>
</template>
