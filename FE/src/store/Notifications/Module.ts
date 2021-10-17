import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";

import { TYPE, useToast } from "vue-toastification";
import { NoticInterface, NoticItemInterface } from "./Interfaces";
import store from "..";
import axios from "axios";
import { apiUrl } from "@/utils";
@Module({ namespaced: true, store, name: "NotifyModule", dynamic: true })
export class NotifyModule extends VuexModule implements NoticInterface {
  info: Array<NoticItemInterface> = [];
  toast = useToast();
  get infos(): Array<NoticItemInterface> {
    return this.info;
  }
  //Mutations
  @Mutation setInfo(data: NoticItemInterface): void {
    const index = this.info.findIndex(
      (item) => item.notice_id === data.notice_id
    );
    if (index === -1) this.info.push(data);
    else this.info[index] = data;
  }
  @Mutation clearNoticeInfo(): void {
    this.info = [];
  }
  @Mutation pushInfo(element: NoticItemInterface): void {
    this.info.push(element);
  }
  @Mutation setList(data: Array<NoticItemInterface>): void {
    this.info = data;
  }
  //Actions
  @Action async setRead(noticId: string): Promise<void> {
    try {
      await axios.post(apiUrl + "/notice/set_readed", {
        notice_id: noticId,
      });
      const index = this.info.findIndex((item) => (item.notice_id = noticId));
      if (index !== -1) this.info[index].readed = true;
    } catch (error) {
      console.log(`error on set Readed Notic\n Error : ${error}`);
    }
  }
  @Action async updateNotics(): Promise<void> {
    const notics = await axios.get(apiUrl + "/notice");
    const noticData = (notics.data as { data: Array<NoticItemInterface> }).data;
    for (const notic of noticData) {
      const index = this.info.findIndex(
        (item) => item.notice_id === notic.notice_id
      );
      if (index === -1 && notic.readed === false) {
        const toast = useToast();
        toast(`${notic.product_name}`, {
          type: TYPE.INFO,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick: (closeToast: any) => {
            notifyState.setRead(notic.notice_id);
            closeToast();
          },
        });
        this.pushInfo(notic);
      }
    }
  }
  @Action async remove_Notice(id: string): Promise<void> {
    await axios.delete(apiUrl + "/notice", { data: { notice_id: id } });
    this.setList(this.info.filter((item) => item.notice_id !== id));
  }
  @Action async remove_readed(): Promise<void> {
    for (const notic of this.info.filter((item) => item.readed)) {
      this.remove_Notice(notic.notice_id);
    }
  }
  @Action async dismissAllToast(): Promise<void> {
    this.toast.clear();
  }
}
export const notifyState = getModule(NotifyModule);
export default notifyState;
