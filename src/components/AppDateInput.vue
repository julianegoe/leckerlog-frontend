<script lang="ts" setup>

const props = defineProps<{
    label: string;
    id: string;
    modelValue: string;
}>()
const emit = defineEmits(['update:modelValue']);

const updateInput = (value: string) => {
    emit('update:modelValue', value);
}

</script>
<template>
    <div class="py-2">
        <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" :for="id">{{ label }}</label>
        <input @keydown.enter.prevent @change.prevent="updateInput(modelValue)" v-model="modelValue" :id="id" :name="id"
            class="py-2 px-4 border-b-2 border-b-black w-full rounded-none shadow-none appearance-none bg-transparent"
            type="date" />
    </div>
</template>
<style scoped>
input[type="date"] {
    display: block;
    min-height: 2.75em;
}
</style>
