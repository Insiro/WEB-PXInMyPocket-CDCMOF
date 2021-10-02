<template>
  <router-link
    :to="to"
    class="
      block
      px-4
      py-2
      text-sm text-gray-700
      hover:bg-indigo-600 hover:text-white
    "
  >
    <slot v-if="$slots.default"></slot>
    <div v-else>{{ text }}</div>
  </router-link>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  text?: string;
  to = prop<string>({ default: "" });
}

export default class MenuItem extends Vue.with(Props) {}
</script>
