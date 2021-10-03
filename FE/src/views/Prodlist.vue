<template>
  <WideFrame>
    <CardHash
      v-for="cate in Array.from(cates)"
      :key="cate"
      :tag="cate"
      :highlight="filterName === cate"
      @hash_click="hashClicked"
    />
  </WideFrame>
  <div class="mt-3 grid grid-cols-3 gap-4">
    <Card
      v-for="(item, index) in prods"
      v-show="index <= viewRange.max && index >= viewRange.min"
      :key="item.id"
      :title="item.name"
      :hash_tags="get_cate(item.category)"
    >
      <!--TODO:insert layout for ItemInfo-->
    </Card>
  </div>
  <WideFrame
    bg_color="bg-transparent"
    class="justify-center"
    :items_center="true"
  >
    <PageNation
      :cur_page="page.cur"
      :max_page="page.max"
      page_size="5"
      @onChanged="changeItemsPage"
    ></PageNation>
  </WideFrame>
  {{ Array.from(cates) }}
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PageNation } from "@/components/PageNation";
import Card, { WideFrame, CardHash } from "@/components/CardFrame";
import prodState from "@/store/Prod";
import { ProductFormat } from "@/store/Prod/Interfaces";

interface min_max {
  min: number;
  max: number;
}

@Options({
  components: {
    PageNation,
    Card,
    WideFrame,
    CardHash,
  },
  watch: {},
})
export default class Products extends Vue {
  fNmae: string = "";
  pageSize = 12;
  page = {
    cur: 1,
    max: Math.round((this.prods.length - 1) / this.pageSize),
  };
  get filterName(): string {
    return this.fNmae;
  }
  set filterName(data: string) {
    this.fNmae = data;
  }
  get prods(): Array<ProductFormat> {
    let list = prodState.productList;
    let retArray: Array<ProductFormat> = [];
    for (let index in list) {
      {
        let cates = new Set(list[index].category.split(" "));
        if (this.filterName === "" || cates.has(this.filterName))
          retArray.push(list[index]);
      }
    }
    return retArray;
  }
  get cates(): Set<string> {
    return prodState.cateList;
  }
  get_cate(cate: string): Array<string> {
    return cate.split(" ");
  }
  get viewRange(): min_max {
    const offset = (this.page.cur - 1) * this.pageSize;
    return { min: offset, max: offset + this.pageSize - 1 };
  }
  changeItemsPage(data: number): void {
    this.page.cur = data;
  }
  hashClicked(data: string): void {
    this.filterName = this.filterName === data ? "" : data;
  }
}
</script>
