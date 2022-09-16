<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import { useApi } from '../../composables/useApi';
import { useContentStore } from '../../store/content';
import { useSortingStore } from '../../store/sorting';
import { useUserStore } from '../../store/user';
import AppBadge from '../../components/globals/AppBadge.vue';
import { FilterItem } from '../../types/types';
import FoodOrderedList from './FoodOrderedList.vue';

const store = useUserStore();
const data = useContentStore();
const sorting = useSortingStore();

const api = useApi();

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
])

onMounted(async () => {
    store.getUserId();
    await store.getIdToken();
    console.log(store.userId, store.idToken)
    const cuisines = await api.getCuisines();
    const leckerlog = await api.getLeckerlog();
    data.setLeckerlogs(leckerlog);
    data.setCuisines(cuisines);
});

const setSortBy = (sortBy: FilterItem) => {
    sorting.set(sortBy);
}

</script>
<template>
    <div>
        <AppHeader>
            <div class="font-bold text-xl">LeckerLog</div>
        </AppHeader>
        <div class="flex flex-row px-2">
            <template v-for="(sortValue, index) in sortBy" :key="index + sortValue.label">
                <AppBadge @click="setSortBy(sortValue)" :sort-by="sortValue" />
            </template>
        </div>
        <div class="px-2 py-2">
            <FoodOrderedList />
        </div>
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