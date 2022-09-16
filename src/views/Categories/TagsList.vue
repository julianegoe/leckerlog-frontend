<script lang="ts" setup>
import TagBox from '../../components/globals/TagBox.vue';
import { useContentStore } from '../../store/content';

const { getTags } = useContentStore()



</script>
<template>
    <h1 class="text-2xl font-bold">Tags</h1>
    <p class="text-xs">(Info: Filter-Funktion noch nicht vorhanden.)</p>
    <div class="flex flex-wrap gap-2 pt-4">
        <div v-for="tag, index in getTags" :key="tag + index">
            <TagBox class="hover:bg-primary-purple" :name="tag" />
        </div>
    </div>
</template>