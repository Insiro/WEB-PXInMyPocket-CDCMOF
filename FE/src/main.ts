import { createApp } from "vue";
import "./registerServiceWorker";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "reset.css";
import "normalize.css";
import "./assets/main.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
