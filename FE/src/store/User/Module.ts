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
  info: UserInfoInterface = {
    email: null,
    profileImg: null,
  };
  signed: boolean = false;
  //class안에서는 인자 1개
  @Mutation setEmail(email: string | null): void {
    this.info.email = email;
  }
  @Mutation setSign(value: boolean): void {
    this.signed = value;
  }
  @Mutation setProfileImg(imgdir: string | null): void {
    this.info.profileImg = imgdir;
  }
  @Mutation setData(data: UserInfoInterface): boolean {
    if (data.email === null) return false;
    this.setEmail(data.email);
    this.setProfileImg(data.profileImg);
    return true;
  }
  //mutation하고 같은 범위라 이름 안겹치게.
  @Action updateData(data: UserInfoInterface): boolean {
    if (data.email === null) return false;
    //TODO: update UserInfo with API
    if (true) {
      this.setData(data);
    } else {
      return false;
    }
    return true;
  }
  @Action signIn(email: string, pwd: string): boolean {
    //TODO: signIn from server;
    if (false) return false;
    const data = {} as UserInfoInterface;
    this.setSign(true);
    this.setData(data);
    return true;
  }
  @Action signOut(): void {
    this.setSign(false);
    this.setData({} as UserInfoInterface);
  }
  get bSigned(): boolean {
    return this.signed;
  }
  get UserData(): UserInfoInterface | null {
    return this.signed ? this.info : null;
  }
}
export const userState = getModule(UserModule);
export default userState;
