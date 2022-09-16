<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
    modelValue: string[];
    label: string;
    id: string;
}>();

const tags = ref(props.modelValue);
const newTag = ref('');
const paddingLeft = ref(10);
const tagsUl = ref<HTMLDivElement>();

const onTagsChange = () => {
    const extraCushion = 15
    paddingLeft.value = tagsUl.value?.clientWidth || 10 + extraCushion;
    tagsUl.value?.scrollTo(tagsUl.value.scrollWidth, 0);
    emit("update:modelValue", tags.value)
}

onMounted(() => onTagsChange())

watch(tags, () => nextTick(onTagsChange), { deep: true });

const addTag = (tag: string) => {
    tags.value.push(tag);
    newTag.value = "";
};

const removeTag = (index: number) => {
    tags.value.splice(index, 1);
};

</script>
<template>
    <div class="relative py-5">
        <label class="absolute -translate-y-2.5 translate-x-4 px-1 bg-white text-sm" :for="id">{{ label }}</label>
        <input @keydown.delete="newTag.length || removeTag(tags.length - 1)" @keypress.space="addTag(newTag)"
            @keypress.enter="addTag(newTag)" class="py-3 px-4 border border-black w-full" v-model="newTag" type="text"
            :style="{ 'padding-left': `${paddingLeft}px` }" :id="id" />

        <ul ref="tagsUl" class="absolute bottom-0 top-0 pl-2 flex items-center text-sm">
            <li v-for="tag, index in tags" :key="tag" class="mr-2 px-2 border-2 border-black bg-white rounded-full">
                {{ tag }} <span @click="removeTag(index)" class="cursor-pointer">x</span>
            </li>
        </ul>
    </div>
</template>