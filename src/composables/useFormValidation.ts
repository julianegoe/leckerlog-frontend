import { ref, watch, Ref } from 'vue';

export const useFormValidation = (input: Ref<string>, validators: any) => {
    const errors = ref<string[]>([]);
    watch(input, () => {
        errors.value = validators.flatMap((validator: any) => validator(input.value) !== null ? [validator(input.value)] : []);
    });

    return {
        input,
        errors
    }
}