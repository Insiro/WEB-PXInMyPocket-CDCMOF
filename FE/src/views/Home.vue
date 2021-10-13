<template>
  <div class="mx-5">
    <div class="text-3xl font-medium text-gray-700 my-3">인기 상품</div>
    <WideFrame>
      <!--:TODO Item Area -->
    </WideFrame>
  </div>
  <div class="flex flex-row">
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
import { WideFrame } from "@/components/CardFrame";
import { postListItem } from "@/store/Post/interfaces";
import postListState from "@/store/Post/postList";
@Options({
  components: {
    Table,
    TableItem,
    TableHead,
    WideFrame,
    Button,
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
  get MiniPosts(): Array<postListItem> {
    //TODO: filter with isNotic?
    return postListState.posts.slice(4);
  }
  get NoticPosts(): Array<postListItem> {
    //TODO: filter with isNotic?
    return postListState.posts.slice(4);
  }
}
</script>
