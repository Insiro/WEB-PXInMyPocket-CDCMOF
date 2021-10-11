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
  @Action async signIn(info: {
    email: string;
    password: string;
  }): Promise<boolean> {
    //TODO: signIn from server;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await axios.post("https://rkskekfk.run.goorm.io/api/home/login", {
        email: info.email,
        password: info.password,
      });
      const userData = result.data.user;
      const data: UserInfoInterface = {
        email: info.email,
        profileImg: "prodileImg" in result ? userData.profileImg : null,
        id: userData.serial_number,
        bye: userData.expire_date,
        rank: userData.rank,
        authority: userData.authority,
        name: userData.name,
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
  @Action async isExist(email: string): Promise<boolean> {
    try {
      const result: { exist: boolean } = await axios.post(
        "/api/home/register/checkId",
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
    //TODO: signIn from server;
    try {
      await axios.post("https://rkskekfk.run.goorm.io/api/home/register", {
        email: info.email,
        password: info.password,
        serial_number: info.id,
        name: info.name,
        expire_date: info.bye,
        rank: info.rank,
      });
      this.setSign(true);
      this.setData(info);
      console.log("check register");
      return true;
    } catch (err: unknown) {
      console.warn("ERROR!!!!! : ", err);
      return false;
    }
  }
  @Action async findID(serial_number: string): Promise<string | null> {
    try {
      const result: { findIdSuccess: boolean; foundID: string } =
        await axios.post("/api/home/finduser/find-id", {
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
        "/api/home/finduser/change-pw",
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
  @Action async changeUserInfo(info: any): Promise<boolean> {
    try {
      console.log(info);

      const result: any = await axios.post(
        "https://rkskekfk.run.goorm.io/api/home/user/finduser/change-userinfo",
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
  get bSigned(): boolean {
    return this.signed;
  }
  get UserData(): UserInfoInterface | null {
    return this.signed ? this.info : null;
  }
}
export const userState = getModule(UserModule);
export default userState;
