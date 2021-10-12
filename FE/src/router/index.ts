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
import Lisense from "../views/Lisense.vue";
import PostList from "../views/PostList.vue";
import postState from "@/store/Post";
import postListState from "@/store/Post/postList";
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
  { name: "Home", url: "/", component: Home },
  { name: "제품 목록", url: "/prodList", component: Prodlist },
  { name: "게시글 목록", url: "/posts", component: PostList },
  { name: "프로젝트 정보", url: "/about", component: About },
  { name: "oss license", url: "/lisense", component: Lisense },
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.beforeEach(async (to: RouteLocationNormalized, _from, next: any) => {
  if (to.name === null || to.name === undefined) {
    globalState.setPageName("");
  } else {
    switch (to.name.toString()) {
      case "제품":
        await curItemState.changeCurItem(to.params.id.toString());
        globalState.setPageName(curItemState.name);
        break;
      case "게시글":
        await postState.setId(to.params.id.toString());
        globalState.setPageName(
          postState.title === "" ? "게시글" : postState.title
        );
        break;
      case "제품 목록":
        prodState.refresh();
        break;
      case "게시글 목록":
        globalState.setPageName("게시글 목록");
        postListState.update();
      default:
        globalState.setPageName(to.name.toString());
    }
  }
  next();
});

export default router;
