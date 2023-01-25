<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useFormValidation } from '../composables/useFormValidation';
import { isRequired } from '../services/ValidatorService';

const props = defineProps<{
    label: string;
    id: string;
    type: string;
    modelValue: string;
    serverErrors?: string[]
}>()
const emit = defineEmits(['update:modelValue', 'validate']);

const inputValue = ref(props.modelValue);
const { input, errors } = useFormValidation(inputValue, [isRequired()]);
const mergedErrors = computed(() => {
    if (props.serverErrors) {
        return [errors.value, props.serverErrors].flat()
    } return errors.value

})
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
        <input :class="{
            'border-b-red-600 outline-b-red-600': mergedErrors.length
        }" @change="$emit('update:modelValue', inputValue)" v-model="inputValue" :id="id" :name="id" autocomplete="off"
            class="w-full py-2 px-4 border-b-2 border-b-black rounded-none shadow-none appearance-none bg-transparent" :type="type"
            :placeholder="label" />
        <div class="text-xs text-red-600 pt-1" v-for="(error, index) in mergedErrors" :key="`error-${index}`">
        {{ error }}
        </div>
    </div>
</template>
