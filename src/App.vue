<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppFooter from "./components/AppFooter/AppFooter.vue";
import { useUserStore } from "./store/user";
import EditFood from "./views/EditFood.vue";

const store = useUserStore();
const router = useRouter()

</script>

<template>
    <main class="mb-24">
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

.test-enter-active {
  transition: all 0.4s ease-out;
}

.test-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.test-enter-from,
.test-leave-to {
  opacity: 0;
}

</style>
