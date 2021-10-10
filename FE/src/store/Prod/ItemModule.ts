import {
  Module,
  VuexModule,
  Mutation,
  getModule,
  Action,
} from "vuex-module-decorators";
import { CurProdIpnterface, ProductFormat } from "./Interfaces";
import store from "..";
import axios from "axios";

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
  get name(): string {
    return this.data.name;
  }
  @Action async changeCurItem(id: string): Promise<void> {
    const result = await axios.get(`/api/product/info?id=${id}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rdata = (result as { data: any }).data.data;
    const data: ProductFormat = {
      id: rdata.product_id,
      name: rdata.product_name,
      remain: rdata.remaining,
      price: rdata.price,
      limit_item: rdata.limit_item,
      category: rdata.category,
      monthly_sale: rdata.monthly_sale,
      weekly_sale: rdata.weekly_sale,
      src: rdata.src,
    };
    this.updateInfo(data);
  }
}
export const curItemState = getModule(CurItemModule);
export default curItemState;
