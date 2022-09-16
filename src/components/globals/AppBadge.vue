<script lang="ts" setup>import { computed } from 'vue';
import { useSortingStore } from '../../store/sorting';
import { FilterItem } from '../../types/types';

const props = defineProps<{
    sortBy: FilterItem;
}>();

const sorting = useSortingStore()

const isActive = computed(() => {
    return sorting.activeSortBy.value === props.sortBy.value ? true : false;
})

</script>
<template>
    <div class="cursor-pointer rounded-full border-2 border-black px-2.5 py-1 mx-1 text-xs font-bold flex justify-center items-center"
        :class="{ 'bg-gray-300': isActive }">
        <div>
            {{ sortBy.label }}
        </div>
    </div>
</template>