<template>
  <a
    :href="href"
    class="
      block
      px-4
      py-2
      text-sm text-gray-700
      hover:bg-indigo-600 hover:text-white
    "
    >{{ text }}</a
  >
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  text = prop<string>({ default: "menu item" });
  href = prop<string>({ default: "#" });
}

export default class MenuItem extends Vue.with(Props) {}
</script>
