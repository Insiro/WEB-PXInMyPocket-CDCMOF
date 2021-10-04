import { Vue } from "vue-class-component";
// Register the router hooks with their names
Vue.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate",
]);
