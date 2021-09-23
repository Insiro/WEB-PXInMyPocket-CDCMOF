<template>
  <label>
    <input
      type="checkbox"
      class="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500"
      :name="name"
    /><span class="ml-2 text-gray-700">{{ text }}</span>
  </label>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";
class Prop {
  text = prop<string>({ default: "checkbox" });
  name = prop<string>({ default: "checkbox" });
}
export default class Name extends Vue.with(Prop) {}
</script>
