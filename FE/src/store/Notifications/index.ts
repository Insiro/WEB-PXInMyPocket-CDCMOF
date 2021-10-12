import { useToast, TYPE } from "vue-toastification";

import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import store from "..";

@Module({ namespaced: true, store, name: "NotifyModule", dynamic: true })
export class NotifyModule extends VuexModule {
  toast = useToast();
  @Action async updateNotics(): Promise<void> {
    //TODO: vie toasts with api
  }
  exampleToast(): void {
    this.toast.info("info toast", {
      timeout: false,
      id: "toastId",
      onClick: () => {
        //TODO: close cloas toast end send readed notification alert
      },
    });
  }
  
  dismissToast(): void {
    this.toast.dismiss("toastID");
  }
  dismissAllToast(): void {
    this.toast.clear();
  }
}
const notifyState = getModule(NotifyModule);
export default notifyState;
