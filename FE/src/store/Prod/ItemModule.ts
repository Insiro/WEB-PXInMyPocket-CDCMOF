import {
  Module,
  VuexModule,
  Mutation,
  getModule,
  Action,
} from "vuex-module-decorators";
import { CurProdIpnterface, ProductFormat } from "./Interfaces";
import store from "..";

@Module({ namespaced: true, store, name: "CurItemModule", dynamic: true })
export class CurItemModule extends VuexModule implements CurProdIpnterface {
  data: ProductFormat = {
    id: "",
    name: "",
    remain: 0,
    price: 0,
    limit_item: false,
    category: "",
    monthly_sale: 0,
    weekly_sale: 0,
    src: null,
  };
  get info(): ProductFormat {
    return this.data;
  }
  @Mutation updateInfo(info: ProductFormat): void {
    this.data = info;
  }

  @Action updateItemID(_id: string): void {
    //TODO:update Item Info
    this.data.name = "";
  }
}
export const curItemState = getModule(CurItemModule);
export default curItemState;
