<template>
  <label>
    <input
      v-model="picked"
      type="radio"
      class="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
      :value="value"
      @click="onClicked"
    /><span class="ml-2 text-gray-700"><slot>Radio</slot></span>
  </label>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Prop {
  value = prop<string>({ default: "value" });
  picked = prop<string>({ default: "" });
}

export default class Radio extends Vue.with(Prop) {
  //TODO: put emit functions
  onClicked(e: Event): void {
    this.$emit("pickUpdate", (e.target as HTMLInputElement).value);
  }
}
</script>
