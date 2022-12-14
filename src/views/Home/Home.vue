<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import { useApi } from '../../composables/useApi';
import { useContentStore } from '../../store/content';
import { useSortingStore } from '../../store/sorting';
import { useUserStore } from '../../store/user';
import AppBadge from '../../components/globals/AppBadge.vue';
import { FilterItem } from '../../types/types';
import FoodOrderedList from './FoodOrderedList.vue';
import { auth } from '../../firebase/firebase';

const userStore = useUserStore();
const data = useContentStore();
const sorting = useSortingStore();
const api = useApi();

const isLoading = ref(false);

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

onBeforeMount(async () => {
    isLoading.value = true;
    userStore.getUserId();
    if (auth.currentUser) {
        const leckerlog = await api.getLeckerlogs();
        data.setLeckerlogs(leckerlog);
    }
    isLoading.value = false;
});

const setSortBy = (sortBy: FilterItem) => {
    sorting.setSortingState(sortBy);
};

</script>
<template>
    <div>
        <AppHeader>
            <div class="font-bold text-xl">LeckerLog</div>
        </AppHeader>
        <div class="flex flex-row p-2">
            <template v-for="(sortValue, index) in sortBy" :key="index + sortValue.label">
                <AppBadge @click="setSortBy(sortValue)" :action-state="sortValue" :active-state="sorting.activeSortBy"
                    route-name="Home" />
            </template>
        </div>
        <div v-if="!isLoading" class="px-2 py-2">
            <FoodOrderedList />
        </div>
        <div v-if="isLoading" class="flex flex-col gap-4 items-center justify-between m-2">
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
            <div class="bg-gray-200 animate-pulse rounded-md w-full h-40"></div>
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
