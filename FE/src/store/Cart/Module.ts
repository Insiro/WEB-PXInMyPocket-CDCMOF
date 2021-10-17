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
import axios from "axios";
import { apiUrl } from "@/utils";

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
    const index: number = this.items.findIndex((item) => item.id === id);
    if (index !== -1) this.items[index].amount++;
    else this.appendItem(id, 1);
  }
  @Mutation check(id: string, isCheck: boolean): void {
    const item = this.items.find((item) => item.id === id);
    if (item !== undefined) item.checked = isCheck;
  }
  @Mutation reduceItem(id: string): void {
    const index: number = this.items.findIndex((item) => item.id === id);
    let amount: number = this.items[index].amount;
    if (amount === -1) return;
    else if (amount !== 1) {
      amount--;
      this.items[index].amount = amount;
    } else this.removdItem(id);
  }
  @Mutation removdItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
  //mutation하고 같은 범위라 이름 안겹치게.
  @Mutation setList(list: Array<CartItemInterface>): void {
    this.items = list;
  }
  @Mutation dumy(mount: number): void {
    const dumyItem = {
      id: "dumy",
      amount: 0,
      checked: false,
      name: "dumy",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_Apple.inc.gif",
      price: 0,
    };
    for (let i = 0; i < mount; i++) this.items.push(dumyItem);
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
    cartState.update();
    //TODO: Request Purchare to Server and return result
    return true;
  }
  @Action async update(): Promise<void> {
    try {
      const result = await axios.get(apiUrl + "/cart");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = result.data;
      const newData: Array<CartItemInterface> = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.data.map((item: any) => {
        const parm: CartItemInterface = {
          img: item.src ?? "",
          name: item.name ?? "",
          id: item.cart_id,
          amount: item.quantity,
          checked: false,
          price: item.price ?? 0,
        };
        newData.push(parm);
      });
      this.setList(newData);
    } catch (error) {
      console.log(error);
    }
  }
  @Action async remove(id: string): Promise<void> {
    try {
      const index = this.items.findIndex((item) => item.id === id);
      if (index === -1) {
        console.log("wrong cart ID");
        return;
      }
      await axios.post("/delete", { id: id });
    } catch (error) {
      console.log(error);
      console.log("failed to remove");
    }
  }
  @Action async UpdateItem(id: string): Promise<void> {
    try {
      const index = this.items.findIndex((item) => item.id === id);
      if (index === -1) {
        console.log("wrong cart ID");
        return;
      }
      const item = this.items[index];
      await axios.post("/edit", { id: id, quantity: item.amount });
    } catch (error) {
      console.log(error);
      console.log("failed to update;");
    }
  }
  get kartData(): Array<CartItemInterface> {
    return this.items;
  }
}
export const cartState = getModule(CartModule);
export default cartState;
