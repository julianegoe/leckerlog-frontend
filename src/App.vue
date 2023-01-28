<script setup lang="ts">
import { useRouter } from "vue-router";
import UiBackground from './components/globals/UiBackground.vue';
import AppFooter from "./components/AppFooter/AppFooter.vue";
import SnackBar from "./components/globals/SnackBar.vue";
import { useUiStore } from "./store/ui";


const router = useRouter();
const ui = useUiStore();

</script>

<template>
  <UiBackground>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </UiBackground>
  <SnackBar :text="ui.snackBarText" :show-snackbar="ui.showSnackBar" />
  <AppFooter v-if="router.currentRoute.value.name !== 'Login' && router.currentRoute.value.name !== 'Signup'" />
</template>
<style scoped>
.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-leave-to {
  transform: translateX(100%)
}
</style>
