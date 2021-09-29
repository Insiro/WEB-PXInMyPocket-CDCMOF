import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Components from "../views/Components.vue";
import Cart from "../views/Carts.vue";
import authUrl from "./auth";

export interface Meta {
  authRequired?: boolean;
  noLayout?: boolean;
}

export interface pageObj {
  icon?: string | null;
  name: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  meta?: Meta;
}

export const pageList: Array<pageObj> = [
  { icon: null, name: "Home", url: "/", component: Home },
  {
    icon: "circle-graph-icon",
    name: "Component",
    url: "/components",
    component: Components,
  },
  {
    icon: null,
    name: "장바구니",
    url: "/cart",
    component: Cart,
  },
  { icon: null, name: "프로젝트 정보", url: "/about", component: About },
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
