<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import { computed } from "vue";
import BackIcon from '../assets/icons/chevron-left.svg?component';
import AppHeader from "../components/AppHeader.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import { useApi } from "../composables/useApi";
import { Leckerlog } from "../types/types";

const api = useApi();

const props = defineProps<{
  cuisine: string;
}>();

const displayRestaurants = computed<Leckerlog[]>(() => [])

const handleDelete = async (id: string) => {
  await api.deleteFoodOrdered(id);
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
      </div>
    </template>
  </div>
</template>
