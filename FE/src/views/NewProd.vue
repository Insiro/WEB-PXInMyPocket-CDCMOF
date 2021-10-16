<template>
  <WideFrame class="grid grid-col-1">
    <TextInput
      v-model="prod.name"
      placeholder="이름"
      input_type="string"
      :value="prod.name"
      :class="inputStyle"
      @updates="onNameChanged"
    />
    <TextInput
      v-model="prod.remain"
      placeholder="잔여"
      input_type="number"
      :value="prod.remain"
      :class="inputStyle"
      @updates="onRemainChanged"
    />
    <TextInput
      v-model="prod.price"
      placeholder="가격"
      input_type="number"
      :value="prod.price"
      :class="inputStyle"
      @updates="onPriceChanged"
    />
    <TextInput
      v-model="prod.category"
      placeholder="카테고리"
      input_type="text"
      :value="prod.category"
      :class="inputStyle"
      @updates="onCateChanged"
    />
    <TextInput
      v-model="prod.src"
      placeholder="상품 이미지"
      input_type="text"
      :value="prod.src"
      :class="inputStyle"
      @updates="onSrcChanged"
    />
    <TextInput
      v-model="prod.content"
      placeholder="설명"
      input_type="text"
      :value="prod.content"
      :class="inputStyle"
      @updates="onContentChanged"
    />
    <label calss="block mt-3">
      <span class="text-sm text-gray-700 block">한정판</span>
      <CheckBox
        value="limited"
        :checked_value="prod.limit_item"
        @updates="checkItem"
        >&nbsp;
      </CheckBox>
    </label>
  </WideFrame>
</template>
<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import { useToast } from "vue-toastification";

import { WideFrame } from "@/components/CardFrame";
import { TextInput, CheckBox, CheckBoxEmit } from "@/components/Inputs";

import curItemState, { isValidProd } from "@/store/Prod/ItemModule";
import { ProductFormat } from "@/store/Prod/Interfaces";

@Options({ components: { WideFrame, TextInput, CheckBox } })
export default class NewProd extends Vue {
  inputStyle = ref("block rounded-md w-full ");
  prod: ProductFormat = {
    id: "",
    name: "", //Use Full
    remain: 0, //Use Full
    price: 0, //Use Full
    limit_item: false, //Use Full
    category: "", //Use Full
    monthly_sale: 0,
    weekly_sale: 0,
    src: null, //Use Full
    content: "",
  };
  toast = useToast();
  //#region OnChangeEvent
  checkItem(data: CheckBoxEmit): void {
    this.prod.limit_item = data.checked;
  }
  onNameChanged(data: string): void {
    this.prod.name = data;
  }
  onCateChanged(data: string): void {
    this.prod.category = data;
  }
  onRemainChanged(data: string): void {
    this.prod.remain = Number(data);
  }
  onSrcChanged(data: string): void {
    this.prod.src = data;
  }
  onContentChanged(data: string): void {
    this.prod.content = data;
  }
  onPriceChanged(data: string): void {
    this.prod.price = Number(data);
  }
  regiostNewProd(): void {
    if (!isValidProd(this.prod)) {
      this.toast.error("필드 값을 확인하시오");
      return;
    }
    curItemState.AddProduct(this.prod);
  }
  //#endregion
}
</script>
