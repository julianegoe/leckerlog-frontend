<script setup lang="ts">
import { useRouter } from "vue-router";
import AppFooter from "./components/AppFooter/AppFooter.vue";


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
    <AppFooter v-if="router.currentRoute.value.name !== 'Login' && router.currentRoute.value.name !== 'Signup'" />
</template>
<style scoped>
.fade-enter-active {
  transition: all 0.25s ease-out;
}

.fade-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
