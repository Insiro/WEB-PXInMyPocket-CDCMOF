<template>
  <Button><router-link to="/new_post">게시글 작성하기</router-link></Button>
  <Table class="mt-5">
    <template #header>
      <TableHead :clsas="[thClass]">이름</TableHead>
      <TableHead :clsas="[thClass]">작성자</TableHead>
      <TableHead :clsas="[thClass]">작성 일자</TableHead>
    </template>
    <template #body>
      <tr v-if="posts.length === 0">
        <TableItem colspan="3" class="text-center">
          등록된 게시글이 없습니다
        </TableItem>
      </tr>
      <tr v-for="item in posts" :key="item.id" @click="viewPost(item.id)">
        <TableItem class="align-middle">{{ item.title }}</TableItem>
        <TableItem class="align-middle">{{ item.author }}</TableItem>
        <TableItem class="align-middle">{{ item.created }}</TableItem>
      </tr>
    </template>
  </Table>
  <WideFrame
    bg_color="bg-transparent"
    class="justify-center"
    :items_center="true"
  >
    <PageNation
      :cur_page="page.cur"
      :max_page="maxIndex"
      page_size="5"
      @onChanged="changeItemsPage"
    ></PageNation>
  </WideFrame>
</template>
<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Options, Vue } from "vue-class-component";

import { Table, TableItem, TableHead } from "@/components/Table";
import { WideFrame } from "@/components/CardFrame";
import { PageNation } from "@/components/PageNation";
import Button from "@/components/Button";

import postListState from "@/store/Post/postList";
import { postListItem } from "@/store/Post/interfaces";

interface pageInterface {
  cur: number;
  max: number;
}

@Options({
  components: { Table, TableItem, TableHead, WideFrame, PageNation, Button },
})
export default class PostList extends Vue {
  router = useRouter();
  thClass = ref(
    "text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
  );
  pageSize = 5;
  page: pageInterface = {
    cur: 1,
    max: this.maxIndex,
  };

  changeItemsPage(data: number): void {
    this.page.cur = data;
  }
  get maxIndex(): number {
    return Math.round((postListState.posts.length - 1) / this.pageSize);
  }
  get posts(): Array<postListItem> {
    return postListState.posts;
  }
  viewPost(id: string): void {
    this.router.push("/post/" + id.toString());
  }
}
</script>
