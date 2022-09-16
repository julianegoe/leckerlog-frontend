<script lang="ts" setup>
import { FilterItem } from '../../types/types';
import AppHeader from '../../components/AppHeader.vue';
import AppBadge from '../../components/globals/AppBadge.vue';
import { useContentStore } from '../../store/content';
import { useApi } from '../../composables/useApi';
import { onMounted, ref } from 'vue';
import { useSortingStore } from '../../store/sorting';
import { useUserStore } from '../../store/user';
import CuisinesList from './CuisinesList.vue';
import TagsList from './TagsList.vue';

const store = useUserStore();
const data = useContentStore();
const api = useApi();
const grouping = useSortingStore();
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    store.getUserId();
    await store.getIdToken();
    const cuisines = await api.getCuisines();
    data.setCuisines(cuisines);
    isLoading.value = false;
});

const groupBy = ref<FilterItem[]>([
    {
        label: 'Küchen',
        value: 'cuisines',
    },
    {
        label: 'Tags',
        value: 'tags',
    },
]);


const setGroupBy = (groupBy: FilterItem) => {
    grouping.setGroupState(groupBy);
}

</script>
<template>
    <div>
        <AppHeader>
            <div class="font-bold text-xl">LeckerLog</div>
        </AppHeader>
        <div class="flex flex-row p-2">
            <template v-for="(groupValue, index) in groupBy" :key="index + groupValue.label">
                <AppBadge @click="setGroupBy(groupValue)" :action-state="groupValue" :active-state="grouping.activeGroupBy" route-name="Categories" />
            </template>
        </div>
        <div v-if="!isLoading && grouping.activeGroupBy.value === 'cuisines'" class="px-2 py-2">
            <CuisinesList />
        </div>
        <div v-if="!isLoading && grouping.activeGroupBy.value === 'tags'" class="px-2 py-2">
            <TagsList />
        </div>
        <div v-if="isLoading" class="grid grid-cols-2 gap-2 px-2 py-2">
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full aspect-square"></div>
        </div>
    </div>
</template>