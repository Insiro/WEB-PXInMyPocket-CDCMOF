<template>
  <SideBarFrame>
    <SideBarItem
      v-for="item in links"
      :key="item.name"
      :link="item"
      :icon="item.icon"
    ></SideBarItem>
  </SideBarFrame>
</template>

<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";
import SideBarFrame from "./SideBarFrame.vue";
import SideBarItem from "./SideBarItem.vue";
import { pageList, pageObj } from "@/router";

class Props {
  title = prop<string>({ default: "testTitle" });
  backgroundColor = prop<string>({ default: "green" });
  abv = prop<string>({ default: "abv" });
}

@Options({
  components: { SideBarFrame, SideBarItem },
})
export default class SideBar extends Vue.with(Props) {
  links: Array<pageObj> = pageList;
}
</script>
