import { createApp } from 'vue'
import App from './App.vue'
import vueCountryRegionSelect from 'vue3-country-region-select'


const app = createApp(App);

app.use(vueCountryRegionSelect)

app.mount('#app');

