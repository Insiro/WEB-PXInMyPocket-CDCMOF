<template>
  <WideFrame container_class="grid grid-col-1">
    <InputContainer :class="[BlockClass]" title="이미지">
      <img
        :src="prod.src"
        style="max-width: 10rem; max-height: 10rem; object-fit: contain"
      />
      <TextInput
        v-model="prod.src"
        placeholder="상품 이미지 주소"
        input_type="url"
        :value="prod.src"
        :class="[inputStyle]"
        @updates="onSrcChanged"
      />
    </InputContainer>
    <InputContainer :class="[BlockClass]" title="이름">
      <TextInput
        v-model="prod.name"
        placeholder="이름"
        input_type="text"
        :value="prod.name"
        :class="[inputStyle]"
        @updates="onNameChanged"
      />
    </InputContainer>
    <InputContainer :class="[BlockClass]" title="잔여량">
      <TextInput
        v-model="prod.remain"
        placeholder="잔여"
        input_type="number"
        :value="prod.remain"
        :class="[inputStyle]"
        @updates="onRemainChanged"
      />
    </InputContainer>
    <InputContainer :class="[BlockClass]" title="카테고리">
      <TextInput
        v-model="prod.category"
        placeholder="카테고리"
        input_type="text"
        :value="prod.category"
        :class="[inputStyle]"
        @updates="onCateChanged"
      />
    </InputContainer>
    <InputContainer :class="[BlockClass]" title="가격">
      <TextInput
        v-model="prod.price"
        placeholder="가격"
        input_type="number"
        :value="prod.price"
        :class="[inputStyle]"
        @updates="onPriceChanged"
      />
    </InputContainer>

    <InputContainer :class="[BlockClass]" title="설명">
      <TextInput
        v-model="prod.content"
        placeholder="설명"
        input_type="text"
        :class="[inputStyle]"
        :value="prod.content"
        @updates="onContentChanged"
      />
    </InputContainer>
    <InputContainer :class="[BlockClass]" title="한정판">
      <CheckBox
        value="limited"
        :checked_value="prod.limit_item"
        @updates="checkItem"
        >&nbsp;
      </CheckBox>
    </InputContainer>
    <Button @onclick="onRegistClicked">등록</Button>
  </WideFrame>
</template>
<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import { useToast } from "vue-toastification";

import { WideFrame } from "@/components/CardFrame";
import {
  TextInput,
  CheckBox,
  CheckBoxEmit,
  InputContainer,
} from "@/components/Inputs";

import curItemState, { isValidProd } from "@/store/Prod/ItemModule";
import { ProductFormat } from "@/store/Prod/Interfaces";
import Button from "@/components/Button";

@Options({
  components: { WideFrame, TextInput, CheckBox, InputContainer, Button },
})
export default class NewProd extends Vue {
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
  //#region styleClass
  inputStyle = ref("rounded-md ");
  BlockClass = ref("block mt-3");
  //#endregion
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
  onRegistClicked(): void {
    //
  }
  //#endregion
}
</script>
