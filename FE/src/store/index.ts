import { Store, createLogger } from "vuex";
import UserInterface from "./User/Interfaces";
export interface RootState {
  user: UserInterface;
}
const store = new Store<RootState>({
  state: { user: { email: null, signed: false, profileImg: null } },
  plugins: [createLogger()],
});
export default store;
