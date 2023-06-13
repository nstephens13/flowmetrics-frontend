import './assets/main.css';
import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Sidebar from 'primevue/sidebar';
import Tree from 'primevue/tree';
import Card from 'primevue/card';

import router from './router';
import App from './App.vue';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

app.component('Calendar', Calendar);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('InputText', InputText);
app.component('Sidebar', Sidebar);
app.component('Tree', Tree);
app.component('Card', Card);

app.mount('#app');
