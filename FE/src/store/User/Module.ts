import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import UserInterface, { UserInfoInterface } from "./Interfaces";
import store from "..";

@Module({ namespaced: true, store, name: "UserModule", dynamic: true })
export class UserModule extends VuexModule implements UserInterface {
  email: string | null = null;
  signed: boolean = false;
  profileImg: string | null = null;
  //class안에서는 인자 1개
  @Mutation setEmail(email: string): void {
    this.email = email;
  }
  @Mutation setSign(value: boolean): void {
    this.signed = value;
  }
  @Mutation signOut(): void {
    this.signed = false;
  }
  //mutation하고 같은 범위라 이름 안겹치게.
  @Action editData(data: string): void {
    this.context.commit("setData", data);
  }
  get bSigned(): boolean {
    return this.signed;
  }
  get UserData(): UserInfoInterface | null {
    if (this.signed === false) return null;
    return Object.assign({}, this as UserInfoInterface);
  }
}
export const UserState = getModule(UserModule);
export default UserState;
