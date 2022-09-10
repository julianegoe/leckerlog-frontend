<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppFooter from "./components/AppFooter/AppFooter.vue";
import { useUserStore } from "./store/user";

const store = useUserStore();
const router = useRouter()

</script>

<template>
    <main id="scroll-container" class="h-[calc(100vh-4rem)] overflow-y-scroll">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
    <AppFooter v-if="router.currentRoute.value.name !== 'Login'" />
</template>
<style scoped>
.fade-enter-active {
  transition: all 0.4s ease-out;
}

.fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
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
