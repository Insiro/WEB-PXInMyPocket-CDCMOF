<template>
  <WideFrame
    title="인기 상품"
    container_class="grid grid-cols-3 justify-items-center"
    class="mx-5"
  >
    <Card
      v-show="Products.length === 0"
      title="등록된 상품이 없습니다"
      bg_color="bg-pink-200"
      src=""
    />
    <Card
      v-for="item in Products"
      :key="item.id"
      :title="item.name"
      :src="item.src"
      :hash_tags="get_cate(item.category)"
      bg_color="bg-pink-200"
      @click="onProdCliked(item.id)"
    >
    </Card>
    <!--:TODO Item Area -->
  </WideFrame>
  <div class="lg:flex lg:flex-row">
    <div class="flex-grow mx-5">
      <div class="text-3xl font-medium text-gray-700 my-3">공지</div>
      <Table>
        <template #header>
          <TableHead :clsas="[thClass]">이름</TableHead>
          <TableHead :clsas="[thClass]">작성자</TableHead>
          <TableHead :clsas="[thClass]">작성 일자</TableHead>
        </template>
        <template #body>
          <tr v-if="NoticPosts.length === 0">
            <TableItem colspan="3" class="text-center">
              등록된 공지가 없습니다
            </TableItem>
          </tr>
          <tr
            v-for="item in NoticPosts"
            :key="item.id"
            @click="viewPost(item.id)"
          >
            <TableItem class="align-middle">{{ item.title }}</TableItem>
            <TableItem class="align-middle">{{ item.author }}</TableItem>
            <TableItem class="align-middle">{{ item.created }}</TableItem>
          </tr>
        </template>
      </Table>
    </div>
    <div class="flex-grow mx-5">
      <div class="text-3xl font-medium text-gray-700 my-3">게시글</div>
      <Table>
        <template #header>
          <TableHead :clsas="[thClass]">이름</TableHead>
          <TableHead :clsas="[thClass]">작성자</TableHead>
          <TableHead :clsas="[thClass]">작성 일자</TableHead>
        </template>
        <template #body>
          <tr v-if="MiniPosts.length === 0">
            <TableItem colspan="3" class="text-center">
              등록된 게시글이 없습니다
            </TableItem>
          </tr>
          <tr
            v-for="item in MiniPosts"
            :key="item.id"
            @click="viewPost(item.id)"
          >
            <TableItem class="align-middle">{{ item.title }}</TableItem>
            <TableItem class="align-middle">{{ item.author }}</TableItem>
            <TableItem class="align-middle">{{ item.created }}</TableItem>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Options, Vue } from "vue-class-component";

import { Table, TableItem, TableHead } from "@/components/Table";
import { Button } from "@/components/Button";
import Card, { WideFrame } from "@/components/CardFrame";

import { postListItem } from "@/store/Post/interfaces";
import postListState from "@/store/Post/postList";
import { ProductFormat } from "@/store/Prod/Interfaces";
import prodState from "@/store/Prod";
@Options({
  components: {
    Table,
    TableItem,
    TableHead,
    WideFrame,
    Button,
    Card,
  },
})
export default class Home extends Vue {
  router = useRouter();
  thClass = ref(
    "text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
  );
  viewPost(id: string): void {
    this.router.push("/post/" + id.toString());
  }
  get_cate(cate: string): Array<string> {
    return cate.split(" ");
  }
  onProdCliked(id: string): void {
    this.router.push({ path: "/prod/" + id.toString() });
  }
  get MiniPosts(): Array<postListItem> {
    //TODO: filter with isNotic?
    console.log(postListState.posts.filter((item) => !item.isNotic));
    return postListState.posts.filter((item) => !item.isNotic).slice(4);
  }
  get NoticPosts(): Array<postListItem> {
    //TODO: filter with isNotic?
    return postListState.posts.filter((item) => item.isNotic).slice(4);
  }
  get Products(): Array<ProductFormat> {
    return prodState.productList.slice(2);
  }
}
</script>
