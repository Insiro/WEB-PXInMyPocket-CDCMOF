<template>
  <button class="px-4" :class="[baseStyle]" @click="onClick">
    <slot>Button</slot>
  </button>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { BtnStyle } from "./index";
export default class Button extends Vue {
  baseStyle = BtnStyle;
  onClick(): void {
    this.$emit("conClick");
  }
}
</script>
