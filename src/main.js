import { createApp } from 'vue';

import App from './App.vue';

import store from './store'; 
import { createPinia } from 'pinia'   
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
const pinia = createPinia()
const app = createApp(App);
import router from './router';
pinia.use(piniaPluginPersistedState)
import '../src/css/style.css';  

   
// json to excel
import vue3JsonExcel from 'vue3-json-excel';

 
 

app.use(pinia).use(store).use(router).use(vue3JsonExcel).mount('#app');