import './assets/main.css';
import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import router from './router';
import App from './App.vue';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

app.component('Calendar', Calendar);
app.component('Button', Button);
app.mount('#app');
