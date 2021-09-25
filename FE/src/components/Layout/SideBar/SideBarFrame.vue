<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="
        fixed
        inset-0
        z-20
        transition-opacity
        bg-black
        opacity-50
        lg:hidden
      "
      @click="isOpen = false"
    ></div>
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
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
          <img class="w-12 h-12" art="logo" />
          <span class="mx-2 text-2xl font-semibold text-white">
            {{ title }}
          </span>
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
import { Vue, prop, Options } from "vue-class-component";
import SideBarItem from "./SideBarItem.vue";
import { useSidebar } from "@/hooks";
class Props {
  title = prop<string>({ default: "testTitle" });
  backgroundColor = prop<string>({ default: "green" });
  abv = prop<string>({ default: "abv" });
}

@Options({
  components: { SideBarItem },
})
export default class SideBarFrame extends Vue.with(Props) {
  isOpen = useSidebar();
  activeLinkIndex = 0;
  // public findActiveLink(): void {
  //   this.links.forEach((link, index) => {
  //     if (link.isActive()) {
  //       this.activeLinkIndex = index;
  //     }
  //   });
  // }
}
</script>
