<script setup lang="ts">
import { useRouter } from "vue-router";
import AppFooter from "./components/AppFooter/AppFooter.vue";
import SnackBar from "./components/globals/SnackBar.vue";
import { useUiStore } from "./store/ui";


const router = useRouter();
const ui = useUiStore();

</script>

<template>
  <div class="mb-24">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <SnackBar :text="ui.snackBarText" :show-snackbar="ui.showSnackBar" />
  <AppFooter v-if="router.currentRoute.value.name !== 'Login' && router.currentRoute.value.name !== 'Signup'" />
</template>
<style>
body {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-leave-to {
  transform: translateX(100%)
}
</style>
