<template>
  <a
    :href="href"
    class="
      px-3
      py-2
      leading-tight
      text-indigo-700
      bg-white
      border border-r-0 border-gray-200
      hover:bg-indigo-500 hover:text-white
    "
    :class="[
      position === 'left' ? leftend : position === 'right' ? rightend : middle,
    ]"
    @click="onItemClick"
  >
    <span>{{ text }}</span>
  </a>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { ref } from "vue";
class Props {
  text = prop<string>({ default: "pagenation Item" });
  position = prop<string>({ default: "middle" });
  href = prop<string>({ default: "#" });
}
export default class PgItem extends Vue.with(Props) {
  leftend = ref("ml-0 rounded-l border-r-0");
  rightend = ref("rounded-r");
  middle = ref("border-r-0");
  onItemClick(): void {
    this.$emit("pageItemClick", this.text);
  }
}
</script>
