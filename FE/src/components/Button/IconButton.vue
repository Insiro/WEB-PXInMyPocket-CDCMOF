<template>
  <button
    :type="type"
    class="flex items-center"
    :class="baseStyle"
    @click="onClick"
  >
    <slot name="icon"><webIcon class="w-5 h-5 mx-1" /></slot>
    <span class="mx-1">
      <slot name="contents"> Btn </slot>
    </span>
  </button>
</template>
<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { webIcon } from "@/components/Icons";
import { BtnStyle } from "./index";
class Props {
  type = prop<string>({ default: "button" });
}

@Options({
  components: { webIcon },
})
export default class IconButton extends Vue.with(Props) {
  onClick(): void {
    this.$emit("onClick");
  }
  baseStyle = BtnStyle;
}
</script>
