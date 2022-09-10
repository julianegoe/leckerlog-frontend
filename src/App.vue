<script setup lang="ts">
import { computed } from "vue";
import AppFooter from "./components/AppFooter.vue";
import { useAuthentication } from "./composables/useAuthentication";
import { useUserStore } from "./store/user";

const store = useUserStore();

const isLoggedIn = computed(() => {
    if (store.userId) {
        return true;
    } else {
        return false;
    }
})

</script>

<template>
    <main id="scroll-container" class="h-[calc(100vh-5rem)] overflow-y-scroll">
        <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
    <AppFooter v-if="isLoggedIn" />
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#scroll-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#scroll-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>
