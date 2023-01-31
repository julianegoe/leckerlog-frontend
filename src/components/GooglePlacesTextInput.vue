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
  if (!googleLocation.value) return;
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

const handlePredictionSearch = (value: any) => {
  emit('update:restaurant', {
    name: value.main_text,
    address: value.vicinity,
  })
  googlePredictions.value = [];
  searchQuery.value = value.main_text;
};

const handleNearbySearch = (value: any) => {
  emit('update:restaurant', {
    name: value.name,
    address: value.vicinity,
  })
  googleNearbySearch.value = [];
  searchQuery.value = value.name;
};

onMounted(() => {
  autocompleteService.value = new google.maps.places.AutocompleteService();
  placesService.value = new google.maps.places.PlacesService(nearbyRef.value);
})
</script>
<template>
  <div class="py-2">
    <input id="autocomplete" type="text" :ref="restaurantRef" v-model="searchQuery" autocomplete="off"
      class="py-2 px-4 border-b-2 border-b-black rounded-none w-full shadow-none appearance-none bg-transparent"
      placeholder="nach Restaurant suchen" />
    <div class="text-red-700 text-xs" v-if="!googleLocation">Dieses Bild hat keine EXIF Daten</div>
    <!-- Predictiions aufgrund von EXIF Daten -->
    <ul v-if="googlePredictions.length > 0" class="border border-black bg-white">
      <li class="cursor-pointer hover:bg-gray-200 p-2" @click="handlePredictionSearch(prediction.structured_formatting)"
        v-for="prediction in googlePredictions" :key="prediction.place_id">
        <div>{{ prediction.structured_formatting.main_text }}</div>
        <div class="text-xs text-gray-400">{{ prediction.structured_formatting.secondary_text }}</div>
      </li>
    </ul>
    <!-- Vorschläge aufgrund von Suchanfrage -->
    <ul v-else-if="googleNearbySearch.length > 0" class="bg-white border border-black">
      <li class="cursor-pointer hover:bg-gray-200 p-2" @click="handleNearbySearch(place)"
        v-for="(place, index) in googleNearbySearch.slice(0, 7)" :key="place.place_id">
        <div>{{ place.name }}</div>
        <div class="text-xs text-gray-400">{{ place.vicinity }}</div>
      </li>
    </ul>
    <div ref="nearbyRef"></div>
  </div>
</template>
