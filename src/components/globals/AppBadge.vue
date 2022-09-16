<script lang="ts" setup>import { computed } from 'vue';
import { FilterItem } from '../../types/types';

const props = defineProps<{
    actionState: FilterItem;
    activeState: FilterItem;
    routeName: 'Categories' | 'Home';
}>();



const isActive = computed(() => {
    return props.activeState.value === props.actionState.value ? true : false;
})

</script>
<template>
    <div class="cursor-pointer rounded-full border-1 border-black shadow-brutal px-2.5 py-1 mx-1 text-xs font-bold flex justify-center items-center"
        :class="{ 
            'bg-primary-green': isActive && routeName === 'Home',
            'bg-primary-purple': isActive && routeName === 'Categories',
             }">
        <div>
            {{ actionState.label }}
        </div>
    </div>
</template>