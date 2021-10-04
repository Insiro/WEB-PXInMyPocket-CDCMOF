import { Store, createLogger } from "vuex";
import UserInterface, { UserInfoInterface } from "./User/Interfaces";
import CartInterface from "./Cart/Interfaces";
export interface RootState {
  user: UserInterface;
  cart: CartInterface;
}
const store = new Store<RootState>({
  state: {
    user: { signed: false, info: {} as UserInfoInterface },
    cart: { items: [] },
  },
  plugins: [createLogger()],
});
export default store;
