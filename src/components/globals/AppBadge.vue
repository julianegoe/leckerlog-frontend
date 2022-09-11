<script lang="ts" setup>import { computed } from 'vue';
import { useViewStore } from '../../store/view';
import { FilterItem } from '../../types/types';

const props = defineProps<{
    view: FilterItem;
}>();

const viewStore = useViewStore()

const isActive = computed(() => {
    return viewStore.active.value === props.view.value ? true : false;
})

</script>
<template>
    <div class="cursor-pointer rounded-full border-2 border-black px-2.5 py-1 mx-1 text-xs font-bold flex justify-center items-center"
        :class="{ 'bg-gray-300': isActive }">
        <div>
            {{ view.label }}
        </div>
    </div>
</template>