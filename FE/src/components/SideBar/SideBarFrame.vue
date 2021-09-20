<template>
  <nav class="sidebar" :data="backgroundColor">
    <div class="sidebar-wrapper text-left">
      <div class="logo">
        <a href="javascript:void(0)" class="simple-text logo-mini">
          {{ abv }}
          abv
        </a>

        <a
          href="javascript:void(0)"
          class="simple-text logo-normal"
          :class="'text-left'"
        >
          {{ title }}
          title
        </a>
      </div>
      <ul class="nav">
        <slot>
          <Item></Item>
        </slot>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";
import Item from "./Item.vue";

class Props {
  title = prop<string>({ default: "testTitle" });
  backgroundColor = prop<string>({ default: "green" });
  abv = prop<string>({ default: "abv" });
}

@Options({
  components: { Item },
})
export default class SideBarFrame extends Vue.with(Props) {
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
