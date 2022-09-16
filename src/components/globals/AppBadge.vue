<script lang="ts" setup>import { computed } from 'vue';
import { FilterItem } from '../../types/types';

const props = defineProps<{
    actionState: FilterItem;
    activeState: FilterItem;
}>();



const isActive = computed(() => {
    return props.activeState.value === props.actionState.value ? true : false;
})

</script>
<template>
    <div class="cursor-pointer rounded-full border-2 border-black px-2.5 py-1 mx-1 text-xs font-bold flex justify-center items-center"
        :class="{ 'bg-gray-300': isActive }">
        <div>
            {{ actionState.label }}
        </div>
    </div>
</template>