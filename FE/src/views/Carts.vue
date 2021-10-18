<template>
  <div class="flex flex-col mt-6">
    <Table>
      <template #header>
        <TableHead>&nbsp;<!--for product Img--></TableHead>
        <TableHead :clsas="[thClass]">이름</TableHead>
        <TableHead :clsas="[thClass]">갯수</TableHead>
        <TableHead :clsas="[thClass]">가격</TableHead>
        <TableHead>선택</TableHead>
      </template>
      <template #body>
        <tr v-if="CartList.length === 0">
          <TableItem colspan="5" class="text-center">
            장바구니에 물건이 없습니다.
          </TableItem>
        </tr>
        <tr v-for="item in CartList" :key="item.id">
          <TableItem>
            <img style="max-height: 10rem" :src="item.img" />
          </TableItem>
          <TableItem class="align-middle">{{ item.name }}</TableItem>
          <TableItem class="align-middle">{{ item.amount }}</TableItem>
          <TableItem class="align-middle">
            {{ item.price * item.amount }}
          </TableItem>
          <TableItem class="align-middle">
            <CheckBox
              :value="item.id"
              :checked_value="item.checked"
              @updates="checkItem"
            >
            </CheckBox>
          </TableItem>
        </tr>
      </template>
    </Table>
  </div>
  <WideFrame title="" class="mt-6">
    <div
      class="flex flex-grow flex-row content-center items-center mx-auto mx-10"
    >
      <div class="flex-col">
        <h3 class="text-3xl font-semibold text-gray-700">합계</h3>
        <div class="mb-2 text-xl font-bold text-gray-900">
          {{ cartMony }} 원
        </div>
      </div>
      <div class="mx-10 px-10" style="width: 1rem" />
      <Button class="" @onClick="purchase">주문 하기</Button>
    </div>
  </WideFrame>
</template>
<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import { Table, TableItem, TableHead } from "@/components/Table";
import { CheckBox, CheckBoxEmit } from "@/components/Inputs";
import cartState from "@/store/Cart";
import { Button } from "@/components/Button";
import { WideFrame } from "@/components/CardFrame";
import CartInterface from "@/store/Cart/Interfaces";
@Options({
  components: {
    Table,
    TableItem,
    TableHead,
    CheckBox,
    WideFrame,
    Button,
  },
})
export default class Carts extends Vue {
  cartMony = 0;
  thClass = ref(
    "text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
  );
  get CartList(): CartInterface[] {
    return cartState.kartData;
  }
  purchase(): void {
    if (cartState.Purchase())
      //TODO: hadle on Async func
      this.updateFee();
  }
  checkItem(data: CheckBoxEmit): void {
    cartState.check(data.value, data.checked);
    this.updateFee();
  }
  updateFee(): void {
    const list = cartState.kartData;
    this.cartMony = 0;
    for (let index in list) {
      if (list[index].checked)
        this.cartMony += list[index].price * list[index].amount;
    }
  }
}
</script>
