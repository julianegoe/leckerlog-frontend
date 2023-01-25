<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { ConvertDMSToDEG } from "../services/GoogleService";

const props = defineProps<{
  label: string;
  inputId: string;
  latitude?: [number, number, number];
  latitudeDirection?: string;
  longitude?: [number, number, number];
  longitudeDirection?: string;
}>()
const emit = defineEmits(['update:restaurant']);

const restaurantRef = ref();
const nearbyRef = ref();

const searchQuery = ref('');
const hasSelected = ref(false);

const googlePredictions = ref<any>([]);
const googleNearbySearch = ref<any>([]);

const autocompleteService = ref();
const placesService = ref();

const googleLocation = computed(() => {
  if (props.latitude && props.longitude && props.latitudeDirection && props.longitudeDirection) {
    const longitude = ConvertDMSToDEG(props.longitude, props.longitudeDirection);
    const latitude = ConvertDMSToDEG(props.latitude, props.latitudeDirection);
    return {
      lat: latitude,
      lng: longitude,
    }
  }
  return undefined;
})

watch(searchQuery, (value, prevValue) => {
    autocompleteService.value.getPlacePredictions({
      input: searchQuery.value,
      types: ['restaurant', 'cafe', 'bar', 'bakery', 'food'],
    }, (predictions: any, status: string) => {
      if (searchQuery.value === '') {
        googlePredictions.value = [];
        return;
      }
      googlePredictions.value = predictions;
    });
  })

  watch(() => props.latitude, () => {
    if (hasSelected.value) {
      return;
    }
    if (!googleLocation.value) {
      return
    }
    placesService.value.nearbySearch({
      location: googleLocation.value,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: 'restaurant',
    }, (results: any, status: string) => {
      if (status === 'OK') {
        googleNearbySearch.value = results;
      }
    })
  })

const handleSelection = (value: any) => {
  emit('update:restaurant', {
    name: value.main_text || value.name,
    address: value.secondary_text || value.vicinity,
  })
  googlePredictions.value = [];
  googleNearbySearch.value = [];
  searchQuery.value = value.name || value.main_text;
  hasSelected.value = true;
};

onMounted(() => {
  autocompleteService.value = new google.maps.places.AutocompleteService();
  placesService.value = new google.maps.places.PlacesService(nearbyRef.value);
})
</script>
<template>
  <div class="py-2">
    <input id="autocomplete" type="text" :ref="restaurantRef" v-model="searchQuery" autocomplete="off"
      class="py-2 px-4 border-b-2 border-b-black w-full" placeholder="nach Restaurant suchen" />
    <div class="text-red-700 text-xs" v-if="!googleLocation">Dieses Bild hat keine EXIF Daten</div>
    <ul v-if="googlePredictions.length > 0" class="border border-black">
      <li class="cursor-pointer hover:bg-gray-200 p-2" @click="handleSelection(prediction.structured_formatting)"
        v-for="prediction in googlePredictions" :key="prediction.place_id">
        <div>{{ prediction.structured_formatting.main_text }}</div>
        <div class="text-xs text-gray-400">{{ prediction.structured_formatting.secondary_text }}</div>
      </li>
    </ul>
    <div v-else-if="googleNearbySearch.length > 0" class="border border-black">
      <div class="cursor-pointer hover:bg-gray-200 p-2" @click="handleSelection(place)"
        v-for="(place, index) in googleNearbySearch.slice(0, 7)" :key="place.place_id">
        <div>{{ place.name }}</div>
        <div class="text-xs text-gray-400">{{ place.vicinity }}</div>
      </div>
    </div>
    <div ref="nearbyRef"></div>
  </div>
</template>
