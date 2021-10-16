<template>
  <SideBarFrame>
    <SideBarItem
      v-for="item in links"
      :key="item.name"
      :link="item"
      :icon="item.icon"
    ></SideBarItem>
    <SideBarItem
      v-for="item in adminLinks"
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
import { pageList, AdminList, pageObjList } from "@/router";
import userState from "@/store/User";

class Props {
  title = prop<string>({ default: "testTitle" });
  backgroundColor = prop<string>({ default: "green" });
  abv = prop<string>({ default: "abv" });
}

@Options({
  components: { SideBarFrame, SideBarItem },
})
export default class SideBar extends Vue.with(Props) {
  links: pageObjList = pageList;
  get adminLinks(): pageObjList {
    if (userState.info.authority) {
      return AdminList;
    }
    return [];
  }
}
</script>
