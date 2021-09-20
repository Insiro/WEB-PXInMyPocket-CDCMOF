<template>
  <component :is="tag" v-bind="$attrs" class="nav-item" tag="li">
    <a class="nav-link">
      <i></i>
      <p>{{ link.name }}</p>
    </a>
  </component>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { Pages } from "@/router";

class props {
  link = prop<Pages.pgobj>({
    default: { name: "", path: "", icon: null },
  });
  tag = prop<string>({ default: "sidebar-link" });
}

export default class Item extends Vue.with(props) {
  static isActive(): void {
    throw new Error("Method not implemented.");
  }
  name = "sidebar-item";
  active = true;
  isActive(): boolean {
    return this.active;
  }
}
</script>
<style></style>
