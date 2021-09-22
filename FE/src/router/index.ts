import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Components from "@/views/Components.vue";
export interface pageObj {
  icon?: string | null;
  name: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

export const pageList: Array<pageObj> = [
  { icon: null, name: "Home", url: "/", component: Home },
  { icon: null, name: "About", url: "/about", component: About },
  { icon: null, name: "Components", url: "/components", component: Components },
];

export const routes: Array<RouteRecordRaw> = pageList.map((item) => {
  return { path: item.url, name: item.name, component: item.component };
});

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home,
//   },
//   {
//     path: "/about",
//     name: "About",
//     component: About,

//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     // component: () =>
//     //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
//   },
// ];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
