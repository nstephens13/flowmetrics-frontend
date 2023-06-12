import './assets/main.css';
import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import { createPinia } from 'pinia';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import router from './router';
import App from './App.vue';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import Column from 'primevue/column';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(PrimeVue);
app.use(router);

app.component('Calendar', Calendar);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Button', Button);
app.mount('#app');
app.component('Card', Card);
