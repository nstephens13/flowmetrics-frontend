import './assets/main.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'

const app = createApp(App)
app.use(PrimeVue)
app.use(router)

app.mount('#app')
app.component('Calender', Calendar)
app.component('Button', Button)
