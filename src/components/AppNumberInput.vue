<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    label: string;
    id: string;
    modelValue: number;
}>()
const emit = defineEmits(['update:modelValue']);

const inputValue = ref<number>(props.modelValue);
const updateInput = (value: number) => {
    emit('update:modelValue', value);
}
</script>
<template>
    <div class="py-2">
        <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" :for="id">{{ label }}</label>
    <input  :min="0" :max="5" @change="updateInput(inputValue)" v-model="inputValue" :id="id" :ame="id" class="py-2 px-4 border-b-2 border-b-black w-full" type="number" />
    </div>
</template>