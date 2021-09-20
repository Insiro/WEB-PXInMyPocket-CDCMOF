<template>
  <SideBarFrame :abv="abv" :title="title" :backgroundColor="backgroundColor">
    <Item v-for="item in links" :key="item.name" :link="item"></Item>
  </SideBarFrame>
  <slot></slot>
</template>
<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";
import SideBarFrame from "./SideBarFrame.vue";
import Item from "./Item.vue";
import { Pages } from "@/router";
// import { Pages } from "@/router";

class Props {
  title = prop<string>({ default: "testTitle" });
  backgroundColor = prop<string>({ default: "green" });
  abv = prop<string>({ default: "abv" });
}

@Options({
  components: { SideBarFrame, Item },
})
export default class SideBar extends Vue.with(Props) {
  links: Array<Pages.pgobj> = Pages.list;
}
</script>
