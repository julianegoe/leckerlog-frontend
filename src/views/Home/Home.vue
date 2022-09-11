<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import { useApi } from '../../composables/useApi';
import { useContentStore } from '../../store/content';
import { useViewStore } from '../../store/view';
import { useUserStore } from '../../store/user';
import AppBadge from '../../components/globals/AppBadge.vue';
import CuisinesView from './CuisinesView.vue';
import { FilterItem } from '../../types/types';
import LastUpdatedView from './LastUpdatedView.vue';

const store = useUserStore();
const data = useContentStore();
const viewStore = useViewStore();

const api = useApi();

const views = ref<FilterItem[]>([
    {
        label: 'Zuletzt hinzugefügt',
        value: 'last_updated',
    },
    {
        label: 'Küchen',
        value: 'cuisines',
    }
])

onMounted(async () => {
    store.getUserId();
    await store.getIdToken();
    const cuisines = await api.getCuisines();
    const leckerlog = await api.getLeckerlog();
    data.setLeckerlogs(leckerlog);
    data.setCuisines(cuisines);
});

const displayView = (view: FilterItem) => {
    viewStore.set(view);
}

</script>
<template>
    <div>
        <AppHeader>
            <div class="font-bold text-xl">LeckerLog</div>
        </AppHeader>
        <div class="flex flex-row px-2">
            <template v-for="(view, index) in views" :key="index">
                <AppBadge @click="displayView(view)" :view="view" />
            </template>
        </div>
        <div class="px-2 py-2">
            <CuisinesView v-if="viewStore.active.value === 'cuisines'" :cuisines="data.cuisines"
                :status="api.status.value" />
            <LastUpdatedView :status="api.status.value" v-else />
        </div>
    </div>
</template>