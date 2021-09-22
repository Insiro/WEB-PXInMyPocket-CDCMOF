<template>
  <!-- <component :is="tag" v-bind="$attrs" class="nav-item" tag="li">
    <router-link
      class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 nav-link"
      :class="[$route.name === 'UIElements' ? activeClass : inactiveClass]"
      to="{{link.url}}"
    >
      <i></i>
      <p>{{ link.name }}</p>
    </router-link>
  </component> -->

  <router-link
    class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
    :class="[$route.name === '{{link.url}}' ? activeClass : inactiveClass]"
    :to="link.url"
  >
    <svg
      class="w-5 h-5"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
        fill="currentColor"
      />
      <path
        d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
        fill="currentColor"
      />
    </svg>

    <span class="mx-4">{{ link.name }}</span>
  </router-link>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { pageObj } from "@/router";
import { ref } from "vue";
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
  get  Rount() {
    return this.$route.name;
  }
  isActive(): boolean {
    return this.active;
  }
}
</script>
<style></style>
