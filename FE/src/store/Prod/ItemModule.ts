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
import prodState from ".";

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
    content: "",
  };
  get info(): ProductFormat {
    return this.data;
  }
  get name(): string {
    return this.data.name;
  }
  get cate(): Array<string> {
    return this.data.category.split(" ");
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get Toast() {
    return this.toast;
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
      content: "",
    };
  }
  @Action async changeCurItem(id: string): Promise<void> {
    const result = await axios.get(apiUrl + `/product/info?id=${id}`);
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
      src: rdata.image,
      content: rdata.content ?? "",
    };
    this.updateInfo(data);
  }
  //#region for Admin
  @Action async changeItemMeta(): Promise<void> {
    const toast = useToast();
    if (!AuthorityRequired()) {
      toast.error("관리자 로그인이 필요합니다");
      return;
    }
    try {
      const parm = {
        remaining: this.info.remain,
        price: this.info.price,
        limit_item: this.info.limit_item,
        category: this.info.category,
        image: this.info.src,
        content: this.info.content,
        id: this.info.id,
        name: this.info.name,
      };
      await axios.post(apiUrl + "/admin/modify-product", parm);
      prodState.refresh();
      toast.success("제품 정보가 업데이트 되었습니다");
    } catch (error) {
      toast.error("제품 정보 업데이트에 실패하였습니다");
      console.log(error);
    }
  }
  @Action async deleteProduct(id: string, name: string): Promise<void> {
    const toast = useToast();
    if (!AuthorityRequired()) {
      toast.error("관리자 로그인이 필요합니다");
      return;
    }
    try {
      await axios.post(apiUrl + "/admin/delete-product", { id: id });
      toast.success("제품이 삭제되었습니다");
    } catch (error) {
      toast.error(`제품 ${name}삭제에 실패하였습니다`);
      console.log(error);
    }
  }
  @Action async AddProduct(): Promise<void> {
    const toast = useToast();
    if (!AuthorityRequired()) {
      toast.error("관리자 로그인이 필요합니다");
      return;
    }
    try {
      const parm = {
        product_name: this.info.name,
        remaining: this.info.remain,
        price: this.info.price,
        limit_item: this.info.limit_item,
        category: this.info.category,
      };
      const ret = await axios.post(apiUrl + "/admin/add-product", parm);
      const dat = Object.assign({}, this.info);
      console.log(dat);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dat.id = ret.data as any;
      toast.success(`제품 ${this.info.name} 추가 되었습니다`);
      prodState.addItem(dat);
    } catch (error) {
      toast.error(`제품 ${this.data.name} 추가에 실패하였습니다`);
      console.log(error);
    }
  }
  //#endregion
}
export const curItemState = getModule(CurItemModule);
export default curItemState;

export function isValidProd(data: ProductFormat): boolean {
  return data.name !== "" && data.category !== "" && data.src !== "";
}
