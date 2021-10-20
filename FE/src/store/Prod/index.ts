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
    if (index !== -1) {
      this.items[index].id = data.id;
      this.items[index].name = data.name;
      this.items[index].remain = data.remain;
      this.items[index].price = data.price;
      this.items[index].limit_item = data.limit_item;
      this.items[index].category = data.category;
      this.items[index].monthly_sale = data.monthly_sale;
      this.items[index].weekly_sale = data.weekly_sale;
      this.items[index].src = data.src;
      this.items[index].content = data.content;
    } else this.toast.error(`존재하지 않는 상품 입니다`);
  }
  @Mutation updateCate(data: Array<string>): void {
    this.cate = new Set(data);
  }
  @Mutation delOne(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
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
          src: item.image,
          content: item.content ?? "",
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
  //#region for Admin
  @Action async deleteProd(id: string): Promise<boolean> {
    if (!AuthorityRequired()) {
      this.toast.error("관리자 로그인이 필요합니다");
      return false;
    }
    try {
      await axios.post(apiUrl + "/admin/delete-product", { id: id });
      this.delOne(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //#endregion
}
export const prodState = getModule(ProductModule);
export default prodState;
