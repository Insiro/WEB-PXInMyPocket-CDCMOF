import {
  Module,
  VuexModule,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import GlobalInterface from "./Interfaces";
import store from "..";

@Module({ namespaced: true, store, name: "GlobalModule", dynamic: true })
export class GlobalModule extends VuexModule implements GlobalInterface {
  SideBarOpen: boolean = false;
  @Mutation setSideBar(state: boolean): void {
    this.SideBarOpen = state;
  }
  get isSideBarOpend(): boolean {
    return this.SideBarOpen;
  }
}
export const globalState = getModule(GlobalModule);
export default globalState;
