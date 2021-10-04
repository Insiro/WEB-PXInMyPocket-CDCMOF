import { createApp } from "vue";
import "./registerServiceWorker";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "reset.css";
import "normalize.css";
import "./assets/main.css";
import "./class-component-hooks";
import { IconComponentList } from "./components/Icons";

const app = createApp(App);
IconComponentList.forEach((icon) => {
  app.component(icon.name, icon.component);
});
app.use(store);
app.use(router);
app.mount("#app");
