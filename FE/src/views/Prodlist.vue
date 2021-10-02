<template>
  <WideFrame>
    <CardHash v-for="cate in cates" :key="cate" :tag="cate" />
  </WideFrame>
  <div class="mt-3 grid grid-cols-3 gap-4">
    <Card title="apple" :hash_tags="get_cate('')">
      about The apple
      <!--TODO:insert layout for ItemInfo-->
    </Card>
    <Card
      v-for="item in prods"
      :key="item.id"
      :title="item.name"
      :hash_tags="get_cate(item.category)"
    >
      <!--TODO:insert layout for ItemInfo-->
    </Card>
  </div>
  <WideFrame>
    <PageNation class="mt-10" @onChanged="changeItemsPage"></PageNation>
  </WideFrame>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PageNation } from "@/components/PageNation";
import Card, { hashList, WideFrame, CardHash } from "@/components/CardFrame";
import prodState from "@/store/Prod";
import { ProductFormat } from "@/store/Prod/Interfaces";
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
  get prods(): Array<ProductFormat> {
    return prodState.productList;
  }
  get cates(): Array<hashList> {
    return prodState.cateList;
  }
  get_cate(cate: string): Array<hashList> {
    //TODO: get categories from rtestFul api;
    return [{ to: "#" + cate, text: "hash" }];
  }
  changeItemsPage(data: string): void {
    //TODO: change items pages base on data
  }
}
</script>
