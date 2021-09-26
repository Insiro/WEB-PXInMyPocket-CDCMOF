import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Components from "../views/Components.vue";
import { pageObj } from "./interface";
import authUrl from "./auth";
export const pageList: Array<pageObj> = [
  { icon: null, name: "Home", url: "/", component: Home },
  { icon: null, name: "About", url: "/about", component: About },
  {
    icon: "circle-graph-icon",
    name: "Component",
    url: "/components",
    component: Components,
  },
];

function PageConvert(pagelist: Array<pageObj>): Array<RouteRecordRaw> {
  return pagelist.map((item) => {
    return {
      path: item.url,
      name: item.name,
      component: item.component,
      meta: {
        authRequired: item.meta?.authRequired ?? false,
        noLayout: item.meta?.noLayout ?? false,
      },
    };
  });
}

export const routes: Array<RouteRecordRaw> = PageConvert(pageList).concat(
  PageConvert(authUrl)
);

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
  routes,
});

export default router;
