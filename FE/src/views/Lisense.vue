<template>
  <!-- eslint-disable-next-line vue/no-v-html-->
  <div id="marked" v-html="markedtext" />
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import marked, { MarkedOptions } from "marked";
import axios from "axios";
const markedOpten: MarkedOptions = {
  renderer: new marked.Renderer(),
  gfm: true,
  headerIds: false,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
};

export default class License extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawMark: any = null;
  markedtext: string = "";
  created(): void {
    this.mark();
  }
  async mark(): Promise<void> {
    marked.setOptions(markedOpten);
    const rawMark = await axios.get("/md/License.md");
    this.markedtext = marked(rawMark.data);
    // this.markedtext = marked(rawMark);
  }
}
</script>
