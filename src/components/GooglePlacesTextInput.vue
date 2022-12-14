<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue';
import {loadScript} from 'vue-plugin-load-script';
import {ConvertDMSToDEG} from "../services/GoogleService";

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

const googleLocation = computed(() => {
  if (props.latitude && props.longitude &&  props.latitudeDirection &&  props.latitudeDirection) {
    const longitude = ConvertDMSToDEG(props.longitude, props.latitudeDirection);
    const latitude = ConvertDMSToDEG(props.latitude,  props.latitudeDirection);
    return {
      lat: latitude,
      lng: longitude,
    }
  }
  return undefined;
})

onMounted(async () => {
    await loadScript(`https://maps.googleapis.com/maps/api/js?key=${ import.meta.env.VITE_GOOGLE_API}&libraries=places`)
    const autocompleteService = new google.maps.places.AutocompleteService();
    const placesService = new google.maps.places.PlacesService(nearbyRef.value);
    
    watch(searchQuery, (value, prevValue) => {
      autocompleteService.getPlacePredictions({
        input: searchQuery.value,
        types: ['restaurant', 'cafe', 'bar', 'bakery', 'food' ],
      }, (predictions: any, status: string) => {
        if (status === 'OK') {
          googlePredictions.value = predictions;
        }
      });
      if (searchQuery.value === '') {
        googlePredictions.value = [];
      }
    })

    watch(() => props.latitude, () => {
      if (hasSelected.value) {
        return;
      }
      if (!googleLocation.value) {
        return
      }
      placesService.nearbySearch({
        location: googleLocation.value,
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: 'restaurant',
      }, (results: any, status: string) => {
        if (status === 'OK') {
          googleNearbySearch.value = results;
        }
      })
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
</script>
<template>
    <div class="py-2">
        <label class="relative -bottom-3 left-4 px-1 bg-white text-sm" :for="inputId">{{ label }}</label>
        <input id="autocomplete" type="text" :ref="restaurantRef" v-model="searchQuery"
               autocomplete="off"  class="py-2 px-4 border border-black w-full" placeholder="nach Restaurant suchen" />
      <div class="text-red-700 text-xs" v-if="!googleLocation">Dieses Bild hat keine EXIF Daten</div>
      <ul v-if="googlePredictions.length > 0" class="border border-black">
            <li class="cursor-pointer hover:bg-gray-200 p-2"
                @click="handleSelection(prediction.structured_formatting)"
                v-for="prediction in googlePredictions" :key="prediction.place_id">
                <div>{{ prediction.structured_formatting.main_text }}</div>
                <div class="text-xs text-gray-400">{{ prediction.structured_formatting.secondary_text }}</div>
            </li>
        </ul>
      <div v-else-if="googleNearbySearch.length > 0" class="border border-black">
        <div class="cursor-pointer hover:bg-gray-200 p-2"
             @click="handleSelection(place)"
             v-for="(place, index) in googleNearbySearch.slice(0, 7)" :key="place.place_id">
          <div>{{ place.name }}</div>
          <div class="text-xs text-gray-400">{{ place.vicinity }}</div>
        </div>
      </div>
      <div ref="nearbyRef"></div>
    </div>
</template>
