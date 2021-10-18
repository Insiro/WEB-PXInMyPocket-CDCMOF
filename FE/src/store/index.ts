import { Store, createLogger } from "vuex";
import UserInterface, { UserInfoInterface } from "./User/Interfaces";
import CartInterface from "./Cart/Interfaces";
import GlobalInterface from "./global/Interfaces";
import ProdInterface, { CurProdIpnterface } from "./Prod/Interfaces";
import postDataInterface, { postListInterface } from "./Post/interfaces";
export interface RootState {
  user: UserInterface;
  cart: CartInterface;
  global: GlobalInterface;
  curItem: CurProdIpnterface;
  prodList: ProdInterface;
  curPost: postDataInterface;
  postList: postListInterface;
}
const store = new Store<RootState>({
  state: {
    user: { signed: false, info: {} as UserInfoInterface },
    cart: { items: [] },
    global: { SideBarOpen: false, PageName: "" },
    curItem: {
      data: {
        id: "",
        name: "",
        remain: 0,
        price: 0,
        limit_item: false,
        category: "",
        monthly_sale: 0,
        weekly_sale: 0,
        src: null,
        content: "",
      },
    },
    prodList: { items: [], cate: new Set([]) },
    curPost: {
      data: {
        isNotic: false,
        id: "",
        content: "",
        author: "",
        created: "",
        comment: [],
        title: "",
      },
    },
    postList: {
      data: [],
    },
  },
  plugins: [createLogger()],
});
export default store;
