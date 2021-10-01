<template>
  <router-link :to="to">
    <span
      class="
        inline-block
        px-3
        py-1
        mb-2
        mr-2
        text-sm
        font-semibold
        text-gray-700
        bg-gray-200
        rounded-full
      "
    >
      <slot>
        {{ text }}
      </slot>
    </span>
  </router-link>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Prop {
  text?: string;
  to = prop<string>({ default: "#" });
}
export default class CardHash extends Vue.with(Prop) {}
</script>
