<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useFormValidation } from '../composables/useFormValidation';
import { isRequired } from '../services/ValidatorService';

const props = defineProps<{
    label: string;
    id: string;
    type: string;
    modelValue: string,
}>()
const emit = defineEmits(['update:modelValue', 'validate']);

const inputValue = ref(props.modelValue);
const { input, errors } = useFormValidation(inputValue, [isRequired()]);
watch(errors, () => {
    if (errors.value.length === 0) {
        emit('validate', true)
    } else {
        emit('validate', false)
    }
})

</script>
<template>
    <div class="py-2">
        <textarea :class="{
            'border-b-red-600 outline-b-red-600': errors.length > 0
        }" @change="$emit('update:modelValue', inputValue)"
            v-model="inputValue" :id="id" :name="id" autocomplete="off"
            class="py-2 px-4 border-b-2 border-b-black rounded-none w-full shadow-none appearance-none bg-transparent" :type="type" :placeholder="label" rows="5"></textarea>
        <div class="text-xs text-red-600 pt-1" v-for="(error, index) in errors" :key="`error-${index}`">{{ error }}
        </div>
    </div>
</template>
