<template>
  <div
    class="mx-10 w-full h-full align-top md:flex md:flex-col overflow-y-scroll"
  >
    <div class="md:flex md:flex-row mx-5 md:flex-grow">
      <img
        class="mx-5 mt-6 md:flex-grow itemArea rounded shadow-lg"
        :src="itemInfo.src"
      />
      <!-- <div></div> -->
      <Card class="mx-5 md:flex-grow itemArea ccard" :title="itemInfo.name">
        <div v-if="category !== undefined" class="px-6 pt-4 pb-2">
          <!--hashTag Area-->
          <CardHash v-for="hash in category" :key="hash" :tag="hash">
            {{ hash }}
          </CardHash>
        </div>
        <div :class="infoLineClass">{{ itemInfo.price }}</div>
        <div :class="infoLineClass">잔여 {{ itemInfo.remain }}</div>
        <div :class="infoLineClass">
          <div class="inline">총 {{ selected.amount }} 개</div>
          <div class="inline">{{ selected.price }} 원</div>
        </div>
        <div class="flex flex-grow mb-3 mt-3">
          <Button
            class="flex-grow px-4 text-sm text-center mx-3"
            @click="moveAmount(false)"
            >-</Button
          >
          <input
            v-model="amount"
            style="min-width: 5rem; max-width: 10rem; text-align: center"
            type="number"
            class="flex-grow"
            @change="amountChamged"
          />
          <Button
            class="flex-grow px-4 text-sm text-center mx-3"
            @click="moveAmount(true)"
            >+</Button
          >
        </div>
        <div class="flex justify-between justify-items-stretch">
          <Button :class="purchaseClass" @onClick="addCart">장바구니</Button>
          <Button :class="purchaseClass" @onClick="purchase">구매하기</Button>
        </div>
      </Card>
    </div>
    <WideFrame class="mx-10 max-w-none mt-3">
      <!--eslint-disable-next-line vue/no-v-html-->
      <div id="marked" class="marked" v-html="markedcont" />
    </WideFrame>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { Vue, Options } from "vue-class-component";
import { RouteLocationNormalized, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import marked from "marked";
import { markedOption } from "@/utils";
import Card, { CardHash, WideFrame } from "@/components/CardFrame";
import Button from "@/components/Button";
import { TextInput } from "@/components/Inputs";
import globalState from "@/store/global";
import { ProductFormat } from "@/store/Prod/Interfaces";
import curItemState from "@/store/Prod/ItemModule";
import cartState from "@/store/Cart";
interface Selected {
  amount: number;
  price: number;
}
@Options({ components: { Card, WideFrame, Button, TextInput, CardHash } })
export default class Name extends Vue {
  //#region init state
  id = "";
  selected: Selected = {
    amount: 0,
    price: 0,
  };
  toast = useToast();
  set pageI(id: string) {
    let name = " ";
    //TODO: get is vaild prod Id from Restful api and Update Name
    if (false) useRouter().push("/404");
    globalState.setPageName(name);
  }
  //#endregion
  //#region styleClass
  purchaseClass = ref("w-full flex-grow px-4 text-sm text-center mx-3");
  infoLineClass = ref("text-base flex-frow px-4");
  //#endregion
  //#region  get / set
  get itemInfo(): ProductFormat {
    return curItemState.info;
  }
  set amount(amount: number) {
    if (amount > this.itemInfo.remain) amount = this.itemInfo.remain;
    else if (amount < 0) amount = 0;
    this.selected.amount = amount;
  }
  get amount(): number {
    return this.selected.amount;
  }
  get category(): Array<string> {
    return curItemState.cate;
  }
  get markedcont(): string {
    marked.setOptions(markedOption);
    return marked(curItemState.info.content);
  }
  //#endregion
  //#region onclick methods
  amountChamged(e: Event): void {
    console.log((e.target as HTMLInputElement).value);
    this.amount = parseInt((e.target as HTMLInputElement).value);
    console.log(this.amount);
  }
  moveAmount(more: boolean): void {
    this.amount += more ? 1 : -1;
  }
  purchase(): void {
    this.toast("결제사와 계약 필요합니다.");
  }
  addCart(): void {
    cartState.AddItem({
      amount: this.selected.amount,
      info: curItemState.data,
    });
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
