import { Store, createLogger } from "vuex";
import UserInterface, { UserInfoInterface } from "./User/Interfaces";
import CartInterface from "./Cart/Interfaces";
import GlobalInterface from "./global/Interfaces";
import ProductModule, { CurProdIpnterface } from "./Prod/Interfaces";
export interface RootState {
  user: UserInterface;
  cart: CartInterface;
  global: GlobalInterface;
  curItem: CurProdIpnterface;
  prodList: ProductModule;
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
      },
    },
    prodList: { items: [], cate: new Set([]) },
  },
  plugins: [createLogger()],
});
export default store;
