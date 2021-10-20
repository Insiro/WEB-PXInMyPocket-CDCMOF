import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import UserInterface, {
  RegistInterface,
  UserInfoInterface,
} from "./Interfaces";
import store from "..";
import axios from "axios";
import { apiUrl } from "@/utils";
import notifyState from "../Notifications";
import cartState from "../Cart";

@Module({ namespaced: true, store, name: "UserModule", dynamic: true })
export class UserModule extends VuexModule implements UserInterface {
  info: UserInfoInterface = {
    email: null,
    profileImg: null,
    id: null,
    bye: null,
    rank: false,
    authority: false,
    name: "",
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
    this.info = data;
    return true;
  }
  @Action async signIn(info: {
    email: string;
    password: string;
  }): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await axios.post(apiUrl + "/home/login", {
        email: info.email,
        password: info.password,
      });
      const data = FormatUserInfo(result.data.user);
      this.setSign(true);
      this.setData(data);
      console.log("check login");
      notifyState.updateNotics();
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
  @Action async isExist(email: string): Promise<boolean> {
    try {
      const result: { exist: boolean } = await axios.post(
        apiUrl + "/home/register/checkId",
        {
          email: email,
        }
      );
      return result.exist;
    } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return false;
    }
  }
  @Action async regist(info: RegistInterface): Promise<boolean> {
    try {
      await axios.post(apiUrl + "/home/register", {
        email: info.email,
        password: info.password,
        serial_number: info.id,
        name: info.name,
        expire_date: info.bye,
        rank: info.rank,
      });
      this.setSign(true);
      this.setData(info);
      this.signIn(info as { email: string; password: string });
      return true;
    } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return false;
    }
  }
  @Action async findID(serial_number: string): Promise<string | null> {
    try {
      const result: { findIdSuccess: boolean; foundID: string } =
        await axios.post(apiUrl + "/home/finduser/find-id", {
          serial_number: serial_number,
        });
      return result.findIdSuccess ? result.foundID : null;
    } catch (err) {
      console.warn("ERROR!!!!! : ", err);
      return null;
    }
  }
  @Action async resetPwd(info: {
    email: string;
    id: string;
  }): Promise<boolean | null> {
    try {
      console.log(info);
      const result: { changePwdSuccess: boolean } = await axios.post(
        apiUrl + "/home/finduser/change-pw",
        {
          email: info.email,
          serial_number: info.id,
        }
      );
      console.log(result);
      return result.changePwdSuccess;
    } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return null;
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  @Action async changeUserInfo(info: any): Promise<boolean> {
    try {
      console.log(info);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await axios.post(
        apiUrl + "/home/user/finduser/change-userinfo",
        {
          new_password: info.new_password,
          new_serial_number: info.new_serial_number,
          new_expire_date: info.new_expire_date,
        }
      );
      return result.data.changeInfoSuccess;
    } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return false;
    }
  }
  @Action async refreshSession(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await axios.post(apiUrl + "/home/signed");
    const data = FormatUserInfo(result.data.user);
    this.setSign(true);
    this.setData(data);
    notifyState.updateNotics();
    cartState.update();
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function FormatUserInfo(data: any): UserInfoInterface {
  return {
    email: data.email,
    profileImg: "prodileImg" in data ? data.profileImg : null,
    id: data.serial_number,
    bye: data.expire_date,
    rank: data.rank,
    authority: data.authority,
    name: data.name,
  };
}
