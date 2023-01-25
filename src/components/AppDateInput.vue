<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
    label: string;
    id: string;
    modelValue: string;
    photoDate: string;
}>()
const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);
const updateInput = (value: string) => {
    emit('update:modelValue', value);
}
const date = computed(() => props.photoDate)
watchEffect(() => {
    inputValue.value = date.value;
    emit('update:modelValue', date.value);
})

</script>
<template>
    <div class="py-2">
        <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" :for="id">{{ label }}</label>
        <input @keydown.enter.prevent @change.prevent="updateInput(inputValue)" v-model="inputValue" :id="id" :name="id"
            class="py-2 px-4 border-b-2 border-b-black w-full" type="date" />
    </div>
</template>
<style scoped>
input[type="date"] {
    display: block;
    min-height: 2.75em;
}
</style>
