<script lang="ts" setup>
/// <reference types="vite-svg-loader" />
import StarIconOutline from '../assets/icons/star-outline.svg?component';
import StarIcon from '../assets/icons/star.svg?component';
import {ref} from "vue";

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: number;
}>();

const rating = ref<number>(props.modelValue)
const setStarRating = (e: any) => {
  rating.value = e.target.value;
  emit('update:modelValue', Number(rating.value))
};
</script>
<template>
  <div class="flex gap-1 py-2">
    <label for="star-1">
      <StarIconOutline v-show="!rating || rating < 1" class="w-6" />
      <StarIcon v-show="rating >= 1" class="w-6" />
    </label>
    <input @change="setStarRating" class="hidden" id="star-1" type="radio" :value="1" name="star-rating">
    <label for="star-2">
      <StarIconOutline v-show="!rating || rating < 2" class="w-6" />
      <StarIcon v-show="rating >= 2" class="w-6" />
    </label>
    <input @change="setStarRating" class="hidden" id="star-2" type="radio" :value="2" name="star-rating">

    <label for="star-3">
      <StarIconOutline v-show="!rating || rating < 3" class="w-6" />
      <StarIcon v-show="rating >= 3" class="w-6" />
    </label>
    <input @change="setStarRating" class="hidden" id="star-3" type="radio" :value="3" name="star-rating">

    <label for="star-4">
      <StarIconOutline v-show="!rating || rating < 4" class="w-6" />
      <StarIcon v-show="rating >= 4" class="w-6" />
    </label>
    <input @change="setStarRating" class="hidden" id="star-4" type="radio" :value="4" name="star-rating">

    <label for="star-5">
      <StarIconOutline v-show="!rating || rating < 5" class="w-6" />
      <StarIcon v-show="rating >= 5" class="w-6" />
    </label>
    <input @change="setStarRating" class="hidden" id="star-5" type="radio" :value="5" name="star-rating">
  </div>
</template>
