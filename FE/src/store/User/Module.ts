import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import UserInterface, { UserInfoInterface } from "./Interfaces";
import store from "..";
import axios from "axios";

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
  @Mutation setData(data: UserInfoInterface): boolean {
    if (data.email === null) return false;
    this.info.email = data.email;
    this.info.profileImg = data.profileImg;
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
  @Action async signIn(info: any): Promise<boolean> {
    //TODO: signIn from server;
    try {
      await axios.post("https://rkskekfk.run.goorm.io/api/home/login", {
        email: info.email,
        password: info.password,
      });
      const data: UserInfoInterface = {
        email: info.email,
        profileImg: null,
        id: null,
        bye: null,
        rank: false,
        authority: false,
      };
      this.setSign(true);
      this.setData(data);
      console.log("check login");
      return true;
    } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return false;
    }
  }
  @Action signOut(): void {
    this.setSign(false);
    this.setData({} as UserInfoInterface);
  }
  @Action async isExist(info: any): Promise<boolean> {
	  try {
		console.log(info.email);
		  const result = await axios.post("https://rkskekfk.run.goorm.io/api/home/register/checkId",{email:info.email});
		console.log(result);
	  return result;
	  } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return false;
    }
  }
  @Action async regist(info: any): Promise<boolean> {
    //TODO: signIn from server;
    try {
      await axios.post("/api/home/register", {
        email: info.email,
        password: info.password,
        serial_number: info.id,
        name: info.name,
        expire_date: info.bye,
        rank: info.category,
      });
      const data: UserInfoInterface = {
        email: info.email,
        profileImg: null,
        id: null,
        bye: null,
        rank: false,
        authority: false,
      };
      this.setSign(true);
      this.setData(data);
      console.log("check register");
      return true;
    } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return false;
    }
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
