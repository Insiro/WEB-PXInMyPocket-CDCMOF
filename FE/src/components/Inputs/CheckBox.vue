<template>
  <label>
    <input
      v-model="checked_value"
      :value="value"
      type="checkbox"
      class="w-5 h-5 text-indigo-600 rounded-md focus:ring-indigo-500"
      :name="name"
      @change="onInputChanged"
    />
    <span class="ml-2 text-gray-700">
      <span class="ml-2 text-gray-700">
        <slot>CheckBox</slot>
      </span>
    </span>
  </label>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";
class Prop {
  name = prop<string>({ default: "checkbox" });
  value = prop<string>({ default: "Checkbox" });
  checked_value = prop<boolean>({ default: false });
}

export default class CheckBox extends Vue.with(Prop) {
  onInputChanged(e: Event): void {
    this.$emit("updates", {
      value: this.value,
      checked: (e.target as HTMLInputElement).checked,
    });
  }
}
</script>
