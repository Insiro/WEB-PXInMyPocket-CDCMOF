import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import SignIn from "@/views/SignIn.vue";
import Components from "@/views/Components.vue";
import Regist from "@/views/Regist.vue";
interface Meta {
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
  { icon: null, name: "About", url: "/about", component: About },
  { icon: null, name: "Components", url: "/components", component: Components },
];

const hiddenUrl: Array<pageObj> = [
  {
    icon: null,
    name: "signIn",
    url: "/signIn",
    component: SignIn,
    meta: { noLayout: true },
  },
  {
    icon: null,
    name: "regist",
    url: "/regist",
    component: Regist,
    meta: { noLayout: true },
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
  PageConvert(hiddenUrl)
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
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
