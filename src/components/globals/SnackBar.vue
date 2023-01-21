<script lang="ts" setup>import { computed } from 'vue';

defineProps<{
    text: string;
    showSnackbar: boolean;
}>();

</script>
<template>
    <Transition name="jump">
        <div
            v-show="showSnackbar" class="fixed bottom-24 right-0 left-0 mx-10 bg-black aspect-auto border border-black rounded-3xl text-center p-1">
            <div class="text-sm text-white">{{ text }}</div>
        </div>
    </Transition>
</template>
<style scoped>
.jump-enter-active,
.jump-leave-active {
  transition: transform 0.25s ease 0.25s;
}

.jump-enter-from,
.jump-leave-to {
  transform: translateY(400%);
}

</style>