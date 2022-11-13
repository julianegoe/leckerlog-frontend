<script lang="ts" setup>
import { ref } from 'vue';
import TagBox from '../../components/globals/TagBox.vue';
import { useContentStore } from '../../store/content';

const { getTags } = useContentStore()

const props = defineProps<{
    modelValue: string[];
}>()

const emit = defineEmits(['update:modelValue'])

const searchTags = ref(props.modelValue);
const tagCheckbox = ref<HTMLInputElement>();
const setTags = (value: string) => {
    if (searchTags.value.includes(value.toLowerCase())) {
        searchTags.value = searchTags.value.filter((tag) => {
            return tag.toLowerCase() !== value.toLowerCase();
        })

    } else if (!searchTags.value.includes(value.toLowerCase())) {
        searchTags.value.push(value.toLowerCase());
    }
    emit('update:modelValue', searchTags.value);
}

</script>
<template>
    <h1 class="text-2xl font-bold px-2">Tags</h1>
    <div class="flex flex-wrap gap-2 pt-4">
        <div v-for="tag, index in getTags" :key="tag + index">
            <input ref="tagCheckbox" @change="setTags(tag)" class="hidden" :id="tag + index" type="checkbox" value="tag"
                name="search-places" :checked="searchTags.includes(tag.toLowerCase())">
            <label :for="tag + index">
                <TagBox :is-active="searchTags.includes(tag.toLowerCase()) || false" 
                     :name="tag" />
            </label>
        </div>
    </div>
</template>