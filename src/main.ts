import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
import './index.css'
import clickOutside from './directives/clickOutside';
import { createPinia } from 'pinia';

const pinia = createPinia()

const app = createApp(App)
.use(router)
.use(pinia)
.directive('click-outside', clickOutside)
.mount('#app');

declare global {
    interface Window { GoogleMapsInit: any; }
}

window.GoogleMapsInit = window.GoogleMapsInit || {};
export const loadedGoogleMapsAPI = new Promise( (resolve,reject) => {

    window['GoogleMapsInit'] = resolve;

    let GMap = document.createElement('script');

    GMap.setAttribute('src',
   `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API}&libraries=places&callback=GoogleMapsInit`);

    document.body.appendChild(GMap); 
});
