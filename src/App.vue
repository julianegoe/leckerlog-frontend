<script setup lang="ts">
import { onAuthStateChanged } from "firebase/auth";
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import AppFooter from "./components/AppFooter/AppFooter.vue";
import { auth } from "./firebase/firebase";
import { useUserStore } from "./store/user";

const store = useUserStore();
const router = useRouter()

const helloWorld = ref(import.meta.env.VITE_TEST)

const authListener = onAuthStateChanged(auth, (user) => {
    if (user) {
      store.updateUserId(user.uid)
      store.refreshIdToken(user)
    } else {
      console.log('logged out')
      store.updateUserId('');
      router.replace({ name: 'Login' });
    }
  })

  onBeforeUnmount(() => authListener())

</script>

<template>
    <main class="mb-24">
      {{ helloWorld }}
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
