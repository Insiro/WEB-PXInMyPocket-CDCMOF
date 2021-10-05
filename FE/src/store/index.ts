import { Store, createLogger } from "vuex";
import UserInterface, { UserInfoInterface } from "./User/Interfaces";
import CartInterface from "./Cart/Interfaces";
import GlobalInterface from "./global/Interfaces";
export interface RootState {
  user: UserInterface;
  cart: CartInterface;
  global: GlobalInterface;
}
const store = new Store<RootState>({
  state: {
    user: { signed: false, info: {} as UserInfoInterface },
    cart: { items: [] },
    global: { SideBarOpen: false },
  },
  plugins: [createLogger()],
});
export default store;
