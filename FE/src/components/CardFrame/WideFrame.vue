<template>
  <div class="mt-8">
    <h4 v-if="title !== undefined" class="text-gray-600">{{ title }}</h4>

    <div class="mt-4">
      <div
        class="flex px-4 py-4 overflow-x-auto rounded-md"
        :class="[bg_color]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  title?: string;
  bg_color = prop<string>({ default: "bg-white" });
}
export default class WideFrame extends Vue.with(Props) {}
</script>
