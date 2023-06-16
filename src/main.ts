import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Sidebar from 'primevue/sidebar';
import Tree from 'primevue/tree';
import Divider from 'primevue/divider';
import Panel from 'primevue/panel';

import router from './router';
import App from './App.vue';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(PrimeVue);
app.use(router);

app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('InputText', InputText);
app.component('Sidebar', Sidebar);
app.component('Tree', Tree);
app.component('Card', Card);
app.component('Dropdown', Dropdown);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Divider', Divider);
app.component('Panel', Panel);

app.mount('#app');
