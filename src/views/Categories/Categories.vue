<script lang="ts" setup>
import { FilterItem } from '../../types/types';
import AppHeader from '../../components/AppHeader.vue';
import AppBadge from '../../components/globals/AppBadge.vue';
import { useSortingStore } from '../../store/sorting';
import CuisinesList from './CuisinesList.vue';
import { onMounted, ref } from 'vue';

const grouping = useSortingStore();
const isLoading = ref(false);

const groupBy = ref<FilterItem[]>([
    {
        label: 'Küchen',
        value: 'cuisines',
    }
]);


const setGroupBy = (groupBy: FilterItem) => {
    grouping.setGroupState(groupBy);
}

const imageUrl = ref('');
const filename = ref('IMG_6323.JPG');
onMounted(async () => {
    console.log(import.meta.env.VITE_IMAGE_API_URL)
    const response = await fetch(`${import.meta.env.VITE_IMAGE_API_URL}/download/?filename=${filename.value}`, {
        method: 'GET',
    });
    const blob = await response.blob();
    imageUrl.value = URL.createObjectURL(blob)
})
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
        <img :src="imageUrl" alt="image">
        <div v-if="!isLoading && grouping.activeGroupBy.value === 'cuisines'" class="px-2 py-2">
            <CuisinesList />
        </div>
        <div v-if="isLoading" class="grid grid-cols-2 gap-6 px-2 py-2">
            <div class="bg-gray-200 animate-pulse w-full rounded-md aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full rounded-md aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full rounded-md aspect-square"></div>
            <div class="bg-gray-200 animate-pulse w-full rounded-md aspect-square"></div>
        </div>
    </div>
</template>
