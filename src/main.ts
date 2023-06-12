import { createApp } from "vue";
import App from "./TicketCalculator.vue";
import "../styleguide.css";
import "../globals.css";


const app = createApp(App, { devtools: false });
app.mount("#app");
