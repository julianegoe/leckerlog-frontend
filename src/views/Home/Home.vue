<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import { useSortingStore } from '../../store/sorting';
import AppBadge from '../../components/globals/AppBadge.vue';
import { FilterItem, FoodOrderedExtended } from '../../types/types';
import { useStorage } from "@vueuse/core";
import FoodCard from '../../components/FoodCard.vue';
import AppEmptyState from '../../components/AppEmptyState.vue';
import axios from 'axios';

const accessToken = useStorage('accessToken', '', localStorage);
const refreshToken = useStorage('refreshToken', '', localStorage);
const user = useStorage('user', {
    user_id: '',
    email: '',
    password: '',
    username: null,
}, localStorage);

const isLoading = ref(true);
const sorting = useSortingStore();
const sortBy = ref<FilterItem[]>([
    {
        label: 'Zuletzt bestellt',
        value: 'last_ordered',
    },
    {
        label: 'Best bewertet',
        value: 'best_rated',
    },
    {
        label: 'A bis Z',
        value: 'alphabetically_asc',
    },
]);

const path = `${import.meta.env.VITE_BASE_API_URL}/food/${user.value.user_id}`;
onMounted(async () => {
    const response = await axios({
        method: 'get',
        url: path,
        headers: {
            'Authorization': `Bearer ${accessToken.value}`,
        }
    });
    if (response.status == 200) {
        const json = await response.data;
        foods.value = json;
    }
    isLoading.value = false;
})
const foods = ref<FoodOrderedExtended[]>([]);
const sortedFood = computed(() => {
    const foodsCopy = [...foods.value];
    switch (sorting.activeSortBy.value) {
        case 'best_rated':
            return foodsCopy.sort((a: FoodOrderedExtended, b: FoodOrderedExtended) => {
                if (a.rating > b.rating) {
                    return -1;
                }
                if (a.rating < b.rating) {
                    return 1;
                }
                if (a.rating === b.rating) {
                    return 0;
                }
                return 0
            });
        case 'alphabetically_asc':
            return foodsCopy.sort((a: FoodOrderedExtended, b: FoodOrderedExtended) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name === b.name) {
                    return 0;
                }
                return 0
            });
        default:
            return foods.value
    }
})

const setSortBy = (sortBy: FilterItem) => {
    sorting.setSortingState(sortBy);
};

</script>
<template>
    <div class="mb-20">
        <AppHeader>
            <div class="font-bold text-xl">LeckerLog</div>
        </AppHeader>
        <div class="flex flex-row p-2">
            <template v-for="(sortValue, index) in sortBy" :key="index + sortValue.label">
                <AppBadge @click="setSortBy(sortValue)" :action-state="sortValue" :active-state="sorting.activeSortBy"
                    route-name="Home" />
            </template>
        </div>
        <div v-if="!isLoading && foods.length" class="flex flex-col gap-y-4 px-2 py-2">
            <template v-for="food in sortedFood" :key="food.food_id + food.name">
                <FoodCard :food="food" />
            </template>
        </div>
        <div v-if="isLoading" class="flex flex-col gap-4 items-center justify-between m-2">
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
        </div>
        <AppEmptyState class="m-2" v-else-if="!isLoading && !sortedFood.length" />
    </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>