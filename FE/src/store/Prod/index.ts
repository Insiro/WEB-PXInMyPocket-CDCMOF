import {
  Module,
  Action,
  VuexModule,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import ProdInterface, { ProductFormat } from "./Interfaces";
import store from "..";

@Module({ namespaced: true, store, name: "ProductModule", dynamic: true })
export class ProductModule extends VuexModule implements ProdInterface {
  items: Array<ProductFormat> = [];
  cate: Array<string> = [];
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
  @Mutation dumy(mount: number): void {
    const dumyItem = {
      id: "dumy",
      name: "dumy",
      remain: 0,
      price: 0,
      limit_item: false,
      category: "dumy",
      monthly_sale: 0,
      weekly_sale: 0,
      src: null,
    };
    const dumyCate = "dumy_category";
    for (let i = 0; i < mount; i++) this.items.push(dumyItem);
    this.cate.push(dumyCate);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Action getCategories(cateString: string): Array<string> {
    //TODO: get categories from Server
    return ["dumy_category"];
  }
  @Action updateCategories(): void {
    //TODO: update categories from API;
  }
  itemCate(id: string): Array<string> {
    const index = this.items.findIndex((item) => (item.id = id));
    if (index === -1) return [];
    return this.items[index].category.split(" ");
  }
  get cateList(): Array<string> {
    return this.cate;
  }
  get productList(): Array<ProductFormat> {
    return this.items;
  }
  prod(id: string): ProductFormat | null {
    //TODO : make work with out module (get prod??)
    return this.items.find((item) => item.id === id) ?? null;
  }
}
export const prodState = getModule(ProductModule);
export default prodState;
