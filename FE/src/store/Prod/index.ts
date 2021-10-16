import {
  Module,
  Action,
  VuexModule,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import ProdInterface, { ProductFormat } from "./Interfaces";
import store from "..";
import axios from "axios";
import { apiUrl, AuthorityRequired } from "@/utils";
import { useToast } from "vue-toastification";
@Module({ namespaced: true, store, name: "ProductModule", dynamic: true })
export class ProductModule extends VuexModule implements ProdInterface {
  toast = useToast();
  items: Array<ProductFormat> = [];
  cate: Set<string> = new Set([]);
  @Mutation update(data: Array<ProductFormat>): void {
    this.items = data;
  }
  @Mutation addItem(data: ProductFormat): void {
    this.items.push(data);
  }
  @Mutation updateItem(data: ProductFormat): void {
    const index = this.items.findIndex((item) => (item.id = data.id));
    if (index !== -1) this.items[index] = data;
    else this.addItem(data);
  }
  @Action updateItems(): boolean {
    //TODO: get Items from RestFul Api
    return false;
  }
  @Mutation updateCate(data: Array<string>): void {
    this.cate = new Set(data);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Action getCategories(_cateString: string): Array<string> {
    //TODO: get categories from Server
    return ["dumy"];
  }
  @Action async updateCategories(): Promise<void> {
    try {
      const data = await axios.get(apiUrl + "/category");
      this.cate.clear();
      (data.data as Array<{ category: string }>).map((item) =>
        this.cate.add(item.category)
      );
    } catch (e) {
      console.log(e);
    }
    //TODO: update categories from API;
  }
  @Action async refresh(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = await axios.get<any>(apiUrl + "/product");
      console.log(list);
      const lit = [];
      for (const item of list.data.data) {
        const it: ProductFormat = {
          id: item.product_id,
          name: item.product_name,
          remain: item.remaining,
          price: item.price,
          limit_item: item.limit_item,
          category: item.category,
          monthly_sale: item.monthly_sale,
          weekly_sale: item.weekly_sale,
          src: item.img,
        };
        lit.push(it);
      }
      this.update(lit);
      const data = await axios.get(apiUrl + "/product/all-category");
      this.updateCate(
        (data.data as Array<{ category: string }>).map((item) => item.category)
      );
    } catch (e) {
      console.log(e);
    }
    //TODO : do refrash list
  }
  itemCate(id: string): Array<string> {
    const index = this.items.findIndex((item) => (item.id = id));
    if (index === -1) return [];
    return this.items[index].category.split(" ");
  }
  get cateList(): Set<string> {
    return this.cate;
  }
  get productList(): Array<ProductFormat> {
    return this.items;
  }
  prod(id: string): ProductFormat | null {
    //TODO : make work with out module (get prod??)
    return this.items.find((item) => item.id === id) ?? null;
  }
  //#region for Admin
  @Action async deleteProd(id: string): Promise<boolean> {
    if (!AuthorityRequired()) {
      this.toast.error("관리자 로그인이 필요합니다");
      return false;
    }
    try {
      await axios.post(apiUrl + "/admin/delete-product", {
        id: id,
      });
      this.update(this.items.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }

    return true; //Is Success
  }
  //#endregion
}
export const prodState = getModule(ProductModule);
export default prodState;
