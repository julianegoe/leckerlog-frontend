import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
import './index.css'
import clickOutside from './directives/clickOutside';

createApp(App).use(router).directive('click-outside', clickOutside).mount('#app')

