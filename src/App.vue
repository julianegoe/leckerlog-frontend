<script setup lang="ts">
import { computed } from "vue";
import AppFooter from "./components/AppFooter.vue";
import { useAuthentication } from "./composables/useAuthentication";
import { auth } from "./firebase/firebase";

const { userData } = useAuthentication();

const isLoggedIn = computed(() => {
    if (userData) {
        return true;
    } else {
        return false;
    }
})

</script>

<template>
    <main class="h-[calc(100vh-5rem)] overflow-y-scroll">
        <RouterView />
    </main>
    <AppFooter v-if="isLoggedIn" />
</template>
