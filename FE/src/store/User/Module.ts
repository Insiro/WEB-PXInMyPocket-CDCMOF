import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import UserInterface, { UserInfoInterface } from "./Interfaces";
import store from "..";
import { userInfo } from "os";

@Module({ namespaced: true, store, name: "UserModule", dynamic: true })
export class UserModule extends VuexModule implements UserInterface {
  info: UserInfoInterface = {
    email: null,
    profileImg: null,
    id: null,
    bye: null,
    rank: false,
    authority: false,
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
  @Mutation setId(id: string | null): void {
    this.info.id = id;
  }
  @Mutation setBye(bye: string | null): void {
    this.info.bye = bye;
  }
  @Mutation setData(data: UserInfoInterface): boolean {
    if (data.email === null && data.id === null) return false;
    // for login
    if (data.email !== null) {
      this.setEmail(data.email);
      this.setProfileImg(data.profileImg);
      return true;
    }
    //for changeInfo
    else {
      this.setProfileImg(data.profileImg);
      this.setId(data.id);
      this.setBye(data.bye);
      return true;
    }
  }
  //mutation하고 같은 범위라 이름 안겹치게.
  @Action signIn(email: string, pwd: string): boolean {
    //TODO: signIn from server;
    if (false) return false;
    const data = {} as UserInfoInterface;
    this.setSign(true);
    if (this.setData(data)) return true;
    return false;
  }
  @Action changeInfo(data: UserInfoInterface): boolean {
    //TODO: send changed userinfo to server
    if (false) return false;
    if (this.setData(data)) return true;
    return false;
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
