<template>
  <WideFrame class="mt-0">
    <div v-if="isNotic" class="text-3xl font-medium text-gray-700 my-3">
      공지
    </div>
  </WideFrame>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="marked mt-5" v-html="postText"></div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import postState from "@/store/Post";
import { WideFrame } from "@/components/CardFrame";
@Options({ components: { WideFrame } })
export default class Post extends Vue {
  viewStr = "";
  get postText(): string {
    console.log(postState.content);
    return postState.content;
  }
  get isNotic(): boolean {
    return postState.isNotic;
  }
}
</script>
