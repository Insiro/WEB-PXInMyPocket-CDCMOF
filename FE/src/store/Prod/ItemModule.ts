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
import { apiUrl, AuthorityRequired } from "@/utils";
import { useToast } from "vue-toastification";

@Module({ namespaced: true, store, name: "CurItemModule", dynamic: true })
export class CurItemModule extends VuexModule implements CurProdIpnterface {
  toast = useToast();
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
  get name(): string {
    return this.data.name;
  }
  @Mutation updateInfo(info: ProductFormat): void {
    this.data = info;
  }
  @Mutation clearItem(): void {
    this.data = {
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
  }
  @Action async changeCurItem(id: string): Promise<void> {
    const result = await axios.get(apiUrl + `/product?id=${id}`);
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
  //#region for Admin
  @Action async changeItemMeta(data: ProductFormat): Promise<void> {
    if (AuthorityRequired()) {
      useToast().error("관리자 로그인이 필요합니다");
      return;
    }
    try {
      const parm = {
        remaining: data.remain,
        price: data.price,
        limit_item: data.limit_item,
        category: Array.from(data.category).join(" "),
      };
      await axios.post(apiUrl + "/admin/modify-product", parm);
    } catch (error) {
      this.toast.error("제품 정보 업데이트에 실패하였습니다");
      console.log(error);
    }
  }
  @Action async deleteProduct(id: string): Promise<void> {
    if (AuthorityRequired()) {
      this.toast.error("관리자 로그인이 필요합니다");
      return;
    }
    try {
      await axios.post(apiUrl + "/admin/delete-product", { id: id });
    } catch (error) {
      this.toast.error("제품 삭제에 실패하였습니다");
      console.log(error);
    }
  }
  @Action async AddProduct(data: ProductFormat): Promise<void> {
    if (AuthorityRequired()) {
      this.toast.error("관리자 로그인이 필요합니다");
      return;
    }
    try {
      const parm = {
        product_name: data.name,
        remaining: data.remain,
        price: data.price,
        limit_item: data.limit_item,
        category: Array.from(data.category).join(" "),
      };
      await axios.post(apiUrl + "/admin/add-product", parm);
    } catch (error) {
      this.toast.error("제품 추가에 실패하였습니다");
      console.log(error);
    }
  }
  //#endregion
}
export const curItemState = getModule(CurItemModule);
export default curItemState;
