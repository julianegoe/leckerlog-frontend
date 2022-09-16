<script lang="ts" setup>
const props = defineProps<{
    name: string
}>()

</script>
<template>
    <div
        class="cursor-pointer rounded-full border border-1 border-black shadow-brutal px-2.5 py-1 mx-1 text-xs font-bold flex justify-center items-center">
        <div>
            {{ name }}
        </div>
    </div>
</template>