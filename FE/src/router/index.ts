import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import authUrl from "./auth";
import Prodlist from "../views/Prodlist.vue";
import * as hidden from "./hidden";
import globalState from "@/store/global";
import curItemState from "@/store/Prod/ItemModule";
import prodState from "@/store/Prod";

export interface Meta {
  authRequired?: boolean;
  noLayout?: boolean;
}

export interface pageObj {
  icon?: string | null;
  name: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: unknown;
  redirect?: string;
  meta?: Meta;
}

export const pageList: Array<pageObj> = [
  { icon: null, name: "Home", url: "/", component: Home },
  { icon: null, name: "제품 목록", url: "/prodList", component: Prodlist },
  { icon: null, name: "프로젝트 정보", url: "/about", component: About },
];

function PageConvert(pagelist: Array<pageObj>): Array<RouteRecordRaw> {
  return pagelist.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {};
    obj.path = item.url;
    obj.name = item.name;
    if (item.component !== undefined) obj.component = item.component;
    obj.meta = {
      authRequired: item.meta?.authRequired ?? false,
      noLayout: item.meta?.noLayout ?? false,
    };
    if (item.redirect !== undefined) obj.redirect = item.redirect;
    return obj as RouteRecordRaw;
  });
}

const routes: Array<RouteRecordRaw> = PageConvert(pageList).concat(
  PageConvert(authUrl).concat(PageConvert(hidden.pageList))
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.beforeEach((to: RouteLocationNormalized, _from, next: any) => {
  if (to.name === null || to.name === undefined) {
    globalState.setPageName("");
  } else {
    const name = to.name.toString();
    if (name === "제품") {
      globalState.setPageName(to.params.id.toString());
      curItemState.updateItemID(to.params.id.toString());
    } else if (name === "제품 목록") prodState.refresh();
    else globalState.setPageName(to.name.toString());
  }
  next();
});

export default router;
