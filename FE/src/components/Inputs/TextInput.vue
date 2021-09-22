<template>
  <div class="relative mx-4 lg:mx-0">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <slot>
        
      </slot>
    </span>
    <input
      class="
        w-32
        pl-10
        pr-4
        text-indigo-600
        border-gray-200
        rounded-md
        sm:w-64
        focus:border-indigo-600
        focus:ring
        focus:ring-opacity-40
        focus:ring-indigo-500
      "
      :type="input_type"
      :placeholder="placeholder"
    />
  </div>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Prop {
  input_type = prop<string>({ default: "text" });
  placeholder = prop<string>({ default: "placeholder" });
}
export default class TextInput extends Vue.with(Prop) {}
</script>
