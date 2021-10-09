<template>
  <div
    class="mx-10 w-full h-full align-top md:flex md:flex-col overflow-y-scroll"
  >
    <div class="md:flex md:flex-row mx-5 md:flex-grow">
      <img
        class="mx-5 mt-6 md:flex-grow itemArea rounded shadow-lg"
        :src="itemInfo.imgUrl"
      />
      <!-- <div></div> -->
      <Card class="mx-5 md:flex-grow itemArea ccard" :title="itemInfo.name">
        <div>{{ itemInfo.price }}</div>
        <div>잔여 {{ itemInfo.remaining }}</div>
        <div>총 {{ selected.amount }} 개</div>
        <div>{{ selected.price }} 원</div>
        <div class="flex flex-grow">
          <Button class="flex-grow" @click="moveAmount(false)">-</Button>
          <input
            v-model="amount"
            style="width: 5rem"
            type="number"
            class="flex-shrink"
            @change="amountChamged"
          />
          <Button class="flex-grow" @click="moveAmount(true)">+</Button>
        </div>
        <div class="flex justify-between justify-items-stretch">
          <Button :class="purchaseClass">장바구니</Button>
          <Button :class="purchaseClass">구매하기</Button>
        </div>
      </Card>
    </div>
    <WideFrame class="mx-10 max-w-none mt-3"> expression of Item </WideFrame>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { Vue, Options } from "vue-class-component";
import { RouteLocationNormalized, useRouter } from "vue-router";
import Card, { WideFrame } from "@/components/CardFrame";
import Button from "@/components/Button";
import { TextInput } from "@/components/Inputs";
import globalState from "@/store/global";
interface ItemInfo {
  name: string;
  price: string;
  category: string;
  remaining: number;
  limit_item: boolean;
  imgUrl?: string;
}
interface Selected {
  amount: number;
  price: number;
}
@Options({ components: { Card, WideFrame, Button, TextInput } })
export default class Name extends Vue {
  //#region init state
  id = "";
  selected: Selected = {
    amount: 0,
    price: 0,
  };
  itemInfo: ItemInfo = {
    name: "Title",
    price: "",
    remaining: 0,
    category: "",
    limit_item: false,
    imgUrl: "",
  };
  set pageI(id: string) {
    let name = " ";
    //TODO: get is vaild prod Id from Restful api and Update Name
    if (false) useRouter().push("/404");
    globalState.setPageName(name);
  }
  //#endregion
  //#region styleClass
  purchaseClass = ref("w-full flex-grow px-4 text-sm text-center mx-3");
  //#endregion
  //#region onclick methods
  amountChamged(e: Event): void {
    console.log((e.target as HTMLInputElement).value);
    this.amount = parseInt((e.target as HTMLInputElement).value);
    console.log(this.amount);
  }
  set amount(amount: number) {
    if (amount > this.itemInfo.remaining) amount = this.itemInfo.remaining;
    else if (amount < 0) amount = 0;
    this.selected.amount = amount;
  }
  get amount(): number {
    return this.selected.amount;
  }
  moveAmount(more: boolean): void {
    this.amount += more ? 1 : -1;
  }
  //#endregion

  //#region router hooks
  beforeRouteUpdate(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    next: any
  ): void {
    this.pageI = to.params.id as string;
    next();
  }
  //#endregion
}
</script>
<style scoped>
@media (max-width: 768px) {
  .itemArea {
    width: 90% !important;
    display: block;
  }
  .ccard {
    min-height: 20%;
    max-height: 90%;
    height: auto;
  }
}

img {
  object-fit: contain;
}
.itemArea {
  background-color: white;
  max-width: 90%;
  width: 42%;
  display: inline-block;
  height: 90%;
}
</style>
