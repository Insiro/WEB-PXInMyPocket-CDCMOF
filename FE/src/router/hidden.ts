import { pageObj } from ".";
import Cart from "@/views/Carts.vue";
import ProdInfo from "../views/ProdInfo.vue";
import PostView from "../views/PostView.vue";
export const pageList: Array<pageObj> = [
  { icon: null, name: "제품", url: "/prod/:id", component: ProdInfo },
  {
    icon: null,
    name: "제품목록",
    url: "/prod",
    component: undefined,
    redirect: "/prodlist",
  },
  {
    icon: "cart-icon",
    name: "장바구니",
    url: "/cart",
    component: Cart,
  },
  {
    icon: null,
    name: "게시글",
    url: "/post/:id",
    component: PostView,
  },
];
