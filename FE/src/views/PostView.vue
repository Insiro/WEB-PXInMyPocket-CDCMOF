<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="marked" v-html="postText"></div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import postState from "@/store/Post";
export default class Post extends Vue {
  viewStr = "";
  get postText(): string {
    console.log(postState.content);
    return postState.content;
  }
}
</script>
