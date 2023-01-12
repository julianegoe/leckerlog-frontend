import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
import './index.css'
import clickOutside from './directives/clickOutside';
import { createPinia } from 'pinia';

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.directive('click-outside', clickOutside)
.mount('#app')

