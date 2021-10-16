<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="is_open ? 'block' : 'hidden'"
      class="
        fixed
        inset-0
        z-20
        transition-opacity
        bg-black
        opacity-50
        lg:hidden
      "
      @click="is_open = false"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="is_open ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="
        fixed
        inset-y-0
        left-0
        z-30
        w-64
        overflow-y-auto
        transition
        duration-300
        transform
        bg-gray-900
        lg:translate-x-0 lg:static lg:inset-0
      "
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <webIcon class="w-12 h-12" art="logo" />
          <router-link to="/" tag="h1">
            <span class="mx-2 text-2xl font-semibold text-white">
              {{ title }}
            </span>
          </router-link>
        </div>
      </div>

      <nav class="mt-10">
        <slot>
          <SideBarItem></SideBarItem>
        </slot>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import globalState from "@/store/global";
import { Vue, prop, Options } from "vue-class-component";
import SideBarItem from "./SideBarItem.vue";
import { Title } from "@/utils";
import { webIcon } from "@/components/Icons";
class Props {
  backgroundColor = prop<string>({ default: "green" });
  abv = prop<string>({ default: "abv" });
}

@Options({
  components: { SideBarItem, webIcon },
})
export default class SideBarFrame extends Vue.with(Props) {
  title = Title;
  activeLinkIndex = 0;
  // public findActiveLink(): void {
  //   this.links.forEach((link, index) => {
  //     if (link.isActive()) {
  //       this.activeLinkIndex = index;
  //     }
  //   });
  // }
  get is_open(): boolean {
    return globalState.isSideBarOpend;
  }
  set is_open(state: boolean) {
    globalState.setSideBar(state);
  }
}
</script>
