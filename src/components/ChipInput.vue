<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';

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
    const extraCushion = 10;
    paddingLeft.value = tagsUl.value?.clientWidth || 10 + extraCushion;
    tagsUl.value?.scrollTo(tagsUl.value.scrollWidth, 0);
    console.log(tags.value);
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
    <div class="py-2">
        <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" :for="id">{{ label }}</label>
        <input @keydown.delete="newTag.length || removeTag(tags.length - 1)" @keypress.space.prevent="addTag(newTag)"
            @keypress.,.prevent="addTag(newTag)" @keypress.enter.prevent class="w-full py-2 px-4 border border-black"
            v-model="newTag" type="text" :id="id" placeholder="Tag hinzufügen" autocomplete=off />

        <ul v-if="tags.length" ref="tagsUl" class="flex flex-wrap justify-start items-center gap-1 p-2 mt-1">
            <li v-for="tag, index in tags" :key="tag" class="px-2 mr-1 min-w-max rounded-full border border-black">
                {{ tag }} <span @click="removeTag(index)" class="cursor-pointer">x</span>
            </li>
        </ul>

    </div>
</template>