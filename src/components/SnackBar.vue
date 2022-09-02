<script lang="ts" setup>

defineProps<{
    text: string;
    showSnackbar: boolean;
}>()

</script>
<template>
    <Transition name="jump">
        <div
            v-show="showSnackbar" class="absolute bottom-24 left-10 z-10 w-3/4 bg-black aspect-auto border border-black rounded-3xl text-center p-1">
            <div class="text-sm text-white">{{ text }}</div>
        </div>
    </Transition>
</template>
<style scoped>
.jump-enter-active,
.jump-leave-active {
  transition: transform 0.2s ease 0.2s;
}

.jump-enter-from,
.jump-leave-to {
  transform: translateY(500%);
}

</style>