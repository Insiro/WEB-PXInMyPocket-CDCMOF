<template>
  <!-- eslint-disable-next-line vue/no-v-html-->
  <div id="marked" v-html="markedtext" />
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import marked from "marked";
import axios from "axios";
import { markedOption } from "@/utils";

export default class License extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawMark: any = null;
  markedtext: string = "";
  created(): void {
    this.mark();
  }

  async mark(): Promise<void> {
    marked.setOptions(markedOption);
    try {
      const rawMark = await axios.get("/md/public/osLicense.md");
      this.markedtext = marked(rawMark.data);
    } catch (error) {
      this.markedtext = "";
    }
    // this.markedtext = marked(rawMark);
  }
}
</script>
