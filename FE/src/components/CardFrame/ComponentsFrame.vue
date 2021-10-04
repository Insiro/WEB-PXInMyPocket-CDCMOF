<template>
  <div class="mt-8">
    <h4 class="text-gray-600">{{ title }}</h4>

    <div class="mt-4">
      <div class="flex px-4 py-4 overflow-x-auto bg-white rounded-md">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  title = prop<string>({ default: "component Frame" });
}
export default class componentFrame extends Vue.with(Props) {}
</script>
