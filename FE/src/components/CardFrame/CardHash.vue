<template>
  <router-link :to="to" @click="clicked">
    <span
      class="
        inline-block
        px-3
        py-1
        mb-2
        mr-2
        text-sm
        font-semibold
        rounded-full
      "
      :class="[highlight ? highlistStyle : defaultStyle]"
    >
      <slot>{{ tag }}</slot>
    </span>
  </router-link>
</template>
<script lang="ts">
import { ref } from "vue";
import { Vue, prop } from "vue-class-component";
class Prop {
  tag = prop<string>({ default: "hash_link" });
  to = prop<string>({ default: "#" });
  highlight = prop<boolean>({ default: false });
}
export default class CardHash extends Vue.with(Prop) {
  defaultStyle = ref(
    "hover:bg-indigo-500 hover:text-white bg-gray-200 text-gray-700"
  );
  highlistStyle = ref("bg-indigo-500 text-white");
  clicked(): void {
    this.$emit("hash_click", this.tag);
  }
}
</script>
