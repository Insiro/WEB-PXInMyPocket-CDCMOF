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
  get prod(): ProductFormat {
    return curItemState.info;
  }
  toast = useToast();
  //#region styleClass
  inputStyle = ref("rounded-md ");
  BlockClass = ref("block mt-3");
  //#endregion
  //#region OnChangeEvent
  checkItem(data: CheckBoxEmit): void {
    const prd = this.prod;
    prd.limit_item = data.checked;
    curItemState.updateInfo(prd);
  }
  onNameChanged(data: string): void {
    const prd = this.prod;
    prd.name = data;
    curItemState.updateInfo(prd);
  }
  onCateChanged(data: string): void {
    const prd = this.prod;
    prd.category = data;
    curItemState.updateInfo(prd);
  }
  onRemainChanged(data: string): void {
    const prd = this.prod;
    prd.remain = Number(data);
    curItemState.updateInfo(prd);
  }
  onSrcChanged(data: string): void {
    const prd = this.prod;
    prd.src = data;
    curItemState.updateInfo(prd);
  }
  onContentChanged(data: string): void {
    const prd = this.prod;
    prd.content = data;
    curItemState.updateInfo(prd);
  }
  onPriceChanged(data: string): void {
    const prd = this.prod;
    prd.price = Number(data);
    curItemState.updateInfo(prd);
  }
  regiostNewProd(): void {
    if (!isValidProd(this.prod)) {
      this.toast.error("필드 값을 확인하시오");
      return;
    }
    curItemState.AddProduct(this.prod);
  }
  editProd(): void {
    if (!isValidProd(this.prod)) {
      this.toast.error("필드 값을 확인하시오");
      return;
    }
    curItemState.changeItemMeta(this.prod);
  }
  onRegistClicked(): void {
    //
  }
  //#endregion
}
</script>
