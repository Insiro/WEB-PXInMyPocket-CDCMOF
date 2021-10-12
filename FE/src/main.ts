import { createApp } from "vue";
import "./registerServiceWorker";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "reset.css";
import "normalize.css";
import "./assets/main.css";
import "./class-component-hooks";
import { IconComponentList } from "./components/Icons";

const ToastOpstion: PluginOptions = {
  position: POSITION.TOP_RIGHT,
};

const app = createApp(App);
IconComponentList.forEach((icon) => {
  app.component(icon.name, icon.component);
});
app.use(Toast, ToastOpstion);
app.use(store);
app.use(router);
app.mount("#app");
