<script lang="ts" setup>
import Plus from '../../assets/icons/plus.svg';

defineProps<{
    isUploading: boolean;
}>()

</script>
<template>
    <button :disabled="isUploading" class="w-24 border-r border-black cursor-pointer grow-1 flex flex-col items-center justify-center hover:bg-gray-400" :class="{
      'disabled:text-gray-500 disabled:cursor-default' : isUploading,
    }">
        <Plus />
    </button>
</template>