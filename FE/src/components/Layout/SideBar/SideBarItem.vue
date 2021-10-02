<template>
  <router-link
    class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
    :class="[isActivePage ? activeClass : inactiveClass]"
    :to="link.url"
    @click="closeSidebar()"
  >
    <component :is="link.icon" v-if="link.icon !== null" />
    <span class="mx-4">{{ link.name }}</span>
  </router-link>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { pageObj } from "@/router";
import { useRoute } from "vue-router";
import { ref } from "vue";
import globalState from "@/store/global";
class props {
  link = prop<pageObj>({
    default: { name: "", path: "", icon: null },
  });
  tag = prop<string>({ default: "sidebar-link" });
}

export default class SideBarItem extends Vue.with(props) {
  static isActive(): void {
    throw new Error("Method not implemented.");
  }
  activeClass = ref("bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100");
  inactiveClass = ref(
    "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
  );
  name = "sidebar-item";
  active = true;
  closeSidebar(): void {
    globalState.setSideBar(false);
  }
  get isActivePage(): boolean {
    return useRoute().name?.toString() === this.link.name;
  }
  isActive(): boolean {
    return this.active;
  }
}
</script>
<style></style>
