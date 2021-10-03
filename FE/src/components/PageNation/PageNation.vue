<template>
  <PgFrame>
    <PgItem text="previous" position="left" @pageItemClick="prevClicked" />
    <PgItem
      v-for="(value, index) in max_page + 1"
      v-show="info.min <= value && info.max >= value"
      :key="index"
      :text="value.toString()"
      :page_active="value === cur_page"
      @pageItemClick="pageNationClicked"
    />
    <PgItem text="next" position="right" @pageItemClick="nextClicked" />
  </PgFrame>
  size : {{ page_size }} info : {{ info }} cur : {{ cur_page }}
</template>
<script lang="ts">
import PgFrame from "./Frame.vue";
import PgItem from "./Item.vue";
import { Vue, Options, prop } from "vue-class-component";
interface Info {
  min: number;
  max: number;
}
class Prop {
  page_size = prop<number>({ default: 1 });
  max_page = prop<number>({ default: 1 });
  cur_page = prop<number>({ default: 1 });
}
@Options({ components: { PgFrame, PgItem } })
export default class PageNation extends Vue.with(Prop) {
  private pageRange: Info = { min: 1, max: this.page_size };
  get info(): Info {
    return this.pageRange;
  }
  set info(info: Info) {
    if (info.max > this.max_page) {
      info.max = this.max_page;
      info.min = this.page_size * (this.max_page / this.page_size - 1) + 1;
    }
    if (info.min < 1) {
      info.min = 1;
      info.max = this.page_size;
    }
    this.pageRange = info;
  }
  set move(pluse: boolean) {
    const moved = this.info;
    if (pluse) {
      moved.min += this.page_size;
      moved.max += this.page_size;
    } else {
      moved.min -= this.page_size;
      moved.max -= this.page_size;
    }
    this.info = moved;
  }
  //#region onclicked
  pageNationClicked(data: string): void {
    this.$emit("onChanged", parseInt(data));
  }
  nextClicked(): void {
    this.move = true;
    this.$emit("onChanged", this.info.max);
  }
  prevClicked(): void {
    this.move = false;
    this.$emit("onChanged", this.info.min);
  }
  //#endregion
}
</script>
