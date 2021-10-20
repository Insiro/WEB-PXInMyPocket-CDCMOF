<template>
  <WideFrame>
    <Button @onClick="refresh"><Refresh /></Button>
    <CardHash
      v-for="cate in Array.from(cates)"
      :key="cate"
      class="ml-3"
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
      :src="item.src"
      :hash_tags="get_cate(item.category)"
      @click="onProdCliced(item.id)"
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
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useRouter } from "vue-router";
import { PageNation } from "@/components/PageNation";
import Card, { WideFrame, CardHash } from "@/components/CardFrame";
import Button from "@/components/Button";
import { Refresh } from "@/components/Icons";
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
    Button,
    Refresh,
  },
  watch: {},
})
export default class Products extends Vue {
  router = useRouter();
  fNmae: string = "";
  pageSize = 12;
  page = {
    cur: 1,
    max: Math.round((this.prods.length - 1) / this.pageSize),
  };
  refresh(): void {
    prodState.refresh();
  }
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
  onProdCliced(id: string): void {
    this.router.push({ path: "/prod/" + id.toString() });
  }
}
</script>
