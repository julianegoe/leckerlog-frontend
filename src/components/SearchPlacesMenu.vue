<script lang="ts" setup>
import { ref } from 'vue';
import TagBox from './globals/TagBox.vue';

const props = defineProps<{
    modelValue: string;
}>()

const emit = defineEmits(['update:modelValue'])

const searchPlaces = ref(props.modelValue);

const nameCheckbox = ref<HTMLInputElement>();
const tagsCheckbox = ref<HTMLInputElement>();
const setSearchPlace = () => {
    if (nameCheckbox.value && tagsCheckbox.value) {
        if (nameCheckbox.value.checked && !tagsCheckbox.value.checked) {
            searchPlaces.value = 'food';
            emit('update:modelValue', 'food')
        } else if (!nameCheckbox.value.checked && tagsCheckbox.value.checked) {
            searchPlaces.value = 'tag';
            emit('update:modelValue', 'tag')
        }
    }
}

</script>
<template>
    <div class="z-10 fixed w-full flex gap-2 bg-primary-purple shadow-brutal py-2">
        <label for="food">
            <TagBox @click="setSearchPlace" :is-active="nameCheckbox?.checked || false" name="Suche in: Namen" />
        </label>
        <input ref="nameCheckbox" @change="setSearchPlace" class="hidden" id="food" type="radio" value="food"
            name="search-places" :checked="modelValue === 'food'">
        <label for="tags">
            <TagBox @click="setSearchPlace" :is-active="tagsCheckbox?.checked || false" name="Suche in: Tags" />
        </label>
        <input ref="tagsCheckbox" @change="setSearchPlace" class="hidden" id="tags" type="radio" value="tags"
            name="search-places" :checked="modelValue === 'tags'">
    </div>
</template>