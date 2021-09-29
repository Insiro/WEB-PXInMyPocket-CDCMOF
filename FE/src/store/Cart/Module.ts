import {
  Module,
  VuexModule,
  Mutation,
  getModule,
  Action,
} from "vuex-module-decorators";
import CartInterface, {
  CartCheckedInterface,
  CartItemInterface,
  ItemInterface,
} from "./Interfaces";
import store from "..";

@Module({ namespaced: true, store, name: "CartModule", dynamic: true })
export class CartModule extends VuexModule implements CartInterface {
  items: Array<CartItemInterface> = [];
  //class안에서는 인자 1개
  @Mutation appendItem(id: string, mount: number): void {
    const item = { name: "", price: 0, img: "", amount: 0 } as ItemInterface; //TODO:get Item name from ID
    this.items.push({
      id: id,
      amount: mount,
      checked: true,
      name: item.name,
      img: item.img,
      price: item.price,
    });
  }
  @Mutation addItem(id: string): void {
    const item = this.items.find((item) => item.id === id);
    if (item !== undefined) item.amount++;
    else this.appendItem(id, 1);
  }
  @Mutation check(id: string, isCheck: boolean): void {
    const item = this.items.find((item) => item.id === id);
    if (item !== undefined) item.checked = isCheck;
  }
  @Mutation reduceItem(id: string): void {
    const item = this.items.find((item) => item.id === id);
    if (item !== undefined && item.amount !== 1) item.amount--;
    else if (item?.amount === 1) this.removdItem(id);
  }
  @Mutation removdItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
  //mutation하고 같은 범위라 이름 안겹치게.
  @Mutation clear(): void {
    this.items = [];
  }

  @Action Purchase(): boolean {
    const plist: Array<CartCheckedInterface> = [];
    for (const index in this.items) {
      if (this.items[index].checked) {
        plist.push({
          id: this.items[index].id,
          amount: this.items[index].amount,
        });
      }
    }
    //TODO: Request Purchare to Server and return result
    return true;
  }
  @Mutation appendForTest(): void {
    this.items.push({
      id: "id",
      amount: 0,
      checked: false,
      name: "name",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_Apple.inc.gif",
      price: 0,
    });
  }
  get kartData(): Array<CartItemInterface> {
    return this.items;
  }
}
export const CartState = getModule(CartModule);
export default CartState;
