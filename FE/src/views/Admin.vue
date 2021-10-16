<template>
  <div class="flex flex-col mt-6">
    <Table>
      <template #header>
        <TableHead>선택</TableHead>
        <TableHead>&nbsp;<!--for product Img--></TableHead>
        <TableHead :clsas="[thClass]">이름</TableHead>
        <TableHead :clsas="[thClass]">갯수</TableHead>
        <TableHead :clsas="[thClass]">가격</TableHead>
        <TableHead>&nbsp;선택</TableHead>
      </template>
      <template #body>
        <tr v-if="prodList.length === 0">
          <TableItem colspan="5" class="text-center">
            등록된 상품이 없습니다
          </TableItem>
        </tr>
        <tr v-for="item in prodList" :key="item.id">
          <TableItem>
            <CheckBox
              :value="item.id"
              :checked_value="checked.has(item.id)"
              @updates="checkItem"
              >&nbsp;
            </CheckBox>
          </TableItem>
          <TableItem>
            <img style="max-height: 10rem" :src="item.src" />
          </TableItem>
          <TableItem class="align-middle">{{ item.name }}</TableItem>
          <TableItem class="align-middle">{{ item.remain }}</TableItem>
          <TableItem class="align-middle">{{ item.price }}</TableItem>
          <TableItem class="align-middle">
            <Button>
              <router-link to="edit_prod">수정</router-link>
            </Button>
          </TableItem>
        </tr>
      </template>
    </Table>
  </div>
  <WideFrame title="" class="mt-6">
    <Button :class="btnButtom">
      <router-link to="new_prod">추가 하기</router-link>
    </Button>
    <Button :class="btnButtom" @onClick="deleteSelected">삭제 하기</Button>
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
import prodState from "@/store/Prod";
import { useToast } from "vue-toastification";
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
  toast = useToast();
  checked: Set<string> = new Set([]);
  cartMony = 0;
  //#region CSS class
  thClass = ref(
    "text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
  );
  btnButtom = ref("mx-3");
  //#endregion
  prodList = prodState.productList;
  async deleteSelected(): Promise<void> {
    let toggleList = Array.from(this.checked);
    let failed = false;
    await toggleList.map(async (id) => {
      const result = await prodState.deleteProd(id);
      failed = failed || result;
    });
    if (toggleList) this.toast.success("상품 삭제에 성공하였습니다");
    else this.toast.error("삭제에 실패한 상품이 있습니다.");
  }
  checkItem(data: CheckBoxEmit): void {
    if (data.checked) {
      this.checked.add(data.value);
    } else {
      this.checked.delete(data.value);
    }
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
