import {
  Module,
  VuexModule,
  Mutation,
  getModule,
  Action,
} from "vuex-module-decorators";
import { useToast } from "vue-toastification";

import CartInterface, {
  CartCheckedInterface,
  CartItemInterface,
} from "./Interfaces";
import store from "..";
import axios from "axios";
import { apiUrl } from "@/utils";
import { ProductFormat } from "../Prod/Interfaces";

@Module({ namespaced: true, store, name: "CartModule", dynamic: true })
export class CartModule extends VuexModule implements CartInterface {
  items: Array<CartItemInterface> = [];
  //class안에서는 인자 1개
  @Mutation appendItem(data: { amount: number; info: ProductFormat }): void {
    this.items.push({
      id: data.info.id,
      amount: data.amount,
      checked: true,
      name: data.info.name,
      img: data.info.src ?? " ",
      price: data.info.price,
    });
  }
  @Mutation addItem(data: ProductFormat): void {
    const index: number = this.items.findIndex((item) => item.id === data.id);
    if (index !== -1) this.items[index].amount++;
    else this.appendItem({ amount: 1, info: data });
  }
  @Mutation check(data: { id: string; isCheck: boolean }): void {
    const item = this.items.find((item) => item.id === data.id);
    if (item !== undefined) item.checked = data.isCheck;
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
      console.log(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newData: Array<CartItemInterface> = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const datas = result.data as { data: Array<any>; info: Array<any> };
      for (let i = 0; i < datas.data.length; i++) {
        const temp = {
          id: datas.data[i].added_product_id,
          amount: datas.data[i].quantity,
          checked: true,
          name: datas.info[i].product_name,
          img: datas.info[i].image,
          price: datas.info[i].price,
        };
        console.log(temp);
        newData.push(temp);
      }
      console.log(newData);
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
      await axios.post(apiUrl + "/edit", { id: id, quantity: item.amount });
    } catch (error) {
      console.log(error);
      console.log("failed to update;");
    }
  }
  @Action async AddItem(data: {
    amount: number;
    info: ProductFormat;
  }): Promise<void> {
    const toast = useToast();
    try {
      const parm = {
        quantity: data.amount,
        added_product_id: data.info.id,
        total_price: 0,
      };
      await axios.post(apiUrl, parm);
      this.appendItem(data);
      toast.success(`장바구니에 ${name}이 추가되었습니다`);
    } catch (error) {
      console.log(error);
      useToast().error(`${name}추가에 실패하였습니다.`);
    }
  }
  get kartData(): Array<CartItemInterface> {
    return this.items;
  }
}
export const cartState = getModule(CartModule);
export default cartState;
