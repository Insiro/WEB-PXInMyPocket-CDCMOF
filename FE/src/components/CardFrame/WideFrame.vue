<template>
  <div class="mt-8">
    <h4
      v-if="title !== undefined"
      class="text-3xl font-medium text-gray-700 my-3"
    >
      {{ title }}
    </h4>

    <div class="mt-4">
      <div
        class="flex px-4 py-4 overflow-x-auto rounded-md"
        :class="[
          bg_color,
          container_class,
          items_center ? 'justify-center' : '',
        ]"
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
  items_center = prop<boolean>({ default: false });
  container_class = prop<string>({ default: "" });
}
export default class WideFrame extends Vue.with(Props) {}
</script>
