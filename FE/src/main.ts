import { createApp } from "vue";
import "./registerServiceWorker";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "reset.css";
import "normalize.css";
import "./assets/main.css";
import Layout from "@/components/Layout";

const app = createApp(App);

app.component("baseLayout", Layout);
app.use(store);
app.use(router);
app.mount("#app");
