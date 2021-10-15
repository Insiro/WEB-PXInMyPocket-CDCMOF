import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";

import { useToast, TYPE } from "vue-toastification";
import { NoticInterface, NoticItemInterface } from "./Interfaces";
import store from "..";
import axios from "axios";
import { apiUrl } from "@/utils";
@Module({ namespaced: true, store, name: "NotifyModule", dynamic: true })
export class NotifyModule extends VuexModule implements NoticInterface {
  info: Array<NoticItemInterface> = [];
  toast = useToast();
  //Mutations
  @Mutation setOrderId(orderId: string | null, IDX: integer): void {
    this.info[IDX].orderId = orderId;
  }
  @Mutation setDate(date: string | null, IDX: integer): void {
    this.info[IDX].date = date;
  }
  @Mutation setProductName(name: string | null, IDX: integer): void {
    this.info[IDX].productName = name;
  }
  @Mutation setQuantity(quantity: number | null, IDX: integer): void {
    this.info[IDX].quantity = quantity;
  }
  @Mutation setTotalPrice(price: number | null, IDX: integer): void {
    this.info[IDX].totalPrice = price;
  }
  @Mutation clearNoticeInfo(): void {
    this.info = [];
  }
  @Mutation pushInfo(element: any): void {
    this.info.push(element);
  }

  //Actions
  @Action async updateNotics(): Promise<any> {
    const arrivedItems = await axios.get(apiUrl + "/home/user/order-arrive");
    console.log(arrivedItems);

    for (let i = 0; i < arrivedItems.data.data.length; i++) {
      const element: any = arrivedItems.data.data[i];
      console.log(element);
      this.pushInfo(element);
    }
    return this.info;
  }

  @Action async showToast(info: { orderId }): Promise<void> {
    this.toast.info("info toast", {
      timeout: false,
      id: "toastId",
      onClick: () => {
        //TODO: close cloas toast end send readed notification alert
      },
    });
  }

  @Action async dismissToast(): Promise<void> {
    this.toast.dismiss("toastID");
  }
  @Action async dismissAllToast(): Promise<void> {
    this.toast.clear();
  }
}
export const notifyState = getModule(NotifyModule);
export default notifyState;
