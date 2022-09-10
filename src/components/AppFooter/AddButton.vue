<script lang="ts" setup>
import Plus from '../../assets/icons/plus.svg';

defineProps<{
    isUploading: boolean;
}>()

</script>
<template>
    <div>
        <button :disabled="isUploading" class="px-8 h-16 border-r border-black cursor-pointer hover:bg-gray-400"
                :class="{
                  'disabled:text-gray-500 disabled:cursor-default' : isUploading,
                }">
            <Plus />
        </button>
    </div>
</template>