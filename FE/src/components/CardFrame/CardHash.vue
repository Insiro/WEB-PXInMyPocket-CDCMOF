<template>
  <router-link :to="tag.to === undefined ? '#' : tag.to">
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
        {{ tag.text }}
      </slot>
    </span>
  </router-link>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { hashList } from ".";
class Prop {
  tag = prop<hashList>({ default: { to: "#", name: "hash_link" } });
}
export default class CardHash extends Vue.with(Prop) {}
</script>
