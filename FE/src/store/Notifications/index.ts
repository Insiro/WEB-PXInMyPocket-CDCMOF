import { useToast, TYPE } from "vue-toastification";

import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";

import {NoticInterface, NoticItemInterface} from './Interfaces'
import store from "..";
import axios from "axios";

@Module({ namespaced: true, store, name: "NotifyModule", dynamic: true })
export class NotifyModule extends VuexModule implements NoticInterface {
  info: Array<NoticItemInterface> = [];
	toast = useToast();
	//Mutations
	@Mutation setOrderId(orderId: string | null): void {
    this.info.orderId = orderId;
  }
	@Mutation setDate(date: string | null): void {
    this.info.date = date;
  }
	@Mutation setProductName(name: string | null): void {
    this.info.productName = nema;
  }
	@Mutation setQuantity(quantity: number | null): void {
    this.info.quantity = quantity;
  }
	@Mutation setTotalPrice(price: number | null): void {
    this.info.totalPrice = price;
  }
	//Actions
  @Action async updateNotics(orderId : string | null, email : string | null): Promise<void> {
	  if(!orderId)
		  return false;
	  else
		  {
			  //FIXME
			  const arrivedItems = await.post("/api/home/user/order-arrive",{email: email});
			  
			  forEach(element in arrivedItems)
			  {
			  const result = await axios.get("https://rkskekfk.run.goorm.io/api/product/order/info",{order_id: element.order_id});
			  this.setDate(result.data.order_date);
			  this.setProductName(result.data.product_name);
			  this.setQuantity(result.data.quantity);
  			  this.setTotalPrice(result.data.price);
			  }
		  }
  }
  @Action async showToast(info: {orderId}): void {
    this.toast.info("info toast", {
      timeout: false,
      id: "toastId",
      onClick: () => {
        //TODO: close cloas toast end send readed notification alert
		  
      },	
    });
  }

  
  @Action async dismissToast(): void {
    this.toast.dismiss("toastID");
  }
  @Action async dismissAllToast(): void {
    this.toast.clear();
  }
}
const notifyState = getModule(NotifyModule);
export default notifyState;
