<template>
  <PgFrame>
    <PgItem text="previous" position="left" @pageItemClick="prevClicked" />
    <PgItem
      v-for="index in page_size"
      :key="index"
      :text="index.toString()"
      @pageItemClick="pageNationClicked"
    />
    <PgItem text="next" position="right" @pageItemClick="nextClicked" />
  </PgFrame>
</template>
<script lang="ts">
import PgFrame from "./Frame.vue";
import PgItem from "./Item.vue";
import { Vue, Options, prop } from "vue-class-component";

class Prop {
  page_size = prop<number>({ default: 1 });
}
@Options({ components: { PgFrame, PgItem } })
export default class PageNation extends Vue.with(Prop) {
  //#region onclicked
  pageNationClicked(data: string): void {
    this.$emit("onChanged", data);
  }
  nextClicked(): void {
    //TODO: pagenation return data move
    const data = "";
    this.$emit("onChanged", data);
  }
  prevClicked(): void {
    //TODO: pagenation return data move
    const data = "";
    this.$emit("onChanged", data);
  }
  //#endregion
}
</script>
