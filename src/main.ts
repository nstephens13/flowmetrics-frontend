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
import MultiSelect from 'primevue/multiselect';
import Tag from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import AutoComplete from 'primevue/autocomplete';
import Chip from 'primevue/chip';
import Tooltip from 'primevue/tooltip';
import InputMask from 'primevue/inputmask';
import OverlayPanel from 'primevue/overlaypanel';
import InputNumber from 'primevue/inputnumber';
import Chart from 'primevue/chart';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

import router from './router';
import App from './App.vue';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import initSlaStore from '@/store/mockdata/initSlaStore';
import initProjectStore from '@/store/mockdata/initProjectStore';
import { initFilterConfigStore } from '@/store/mockdata/initFilterConfigStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue);
app.use(router);

app.component('Calendar', Calendar);
app.component('Card', Card);
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
app.component('Divider', Divider);
app.component('Panel', Panel);
app.component('ProgressBar', ProgressBar);
app.component('MultiSelect', MultiSelect);
app.component('Tag', Tag);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('AutoComplete', AutoComplete);
app.component('Chip', Chip);
app.component('InputMask', InputMask);
app.component('OverlayPanel', OverlayPanel);
app.component('InputNumber', InputNumber);
app.directive('tooltip', Tooltip);
app.component('Chart', Chart);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);

app.mount('#app');

// initialize the stores
initProjectStore();
initFilterConfigStore();
initSlaStore();
