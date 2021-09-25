<template>
  <div>
    <span
      v-if="is_icon"
      class="absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <slot v-if="is_icon"> </slot>
    </span>
    <input
      v-model="value"
      :class="[defaultClass, is_icon ? iconedClass : notIconedClass]"
      :type="input_type"
      :placeholder="placeholder"
      @change="onInputChanged"
    />
  </div>
</template>
<script lang="ts">
import { Vue, prop } from "vue-class-component";
import { ref } from "vue";
class Prop {
  input_type = prop<string>({ default: "text" });
  placeholder = prop<string>({ default: "placeholder" });
  is_icon = prop<boolean>({ default: false });
  value = prop<string>({ default: "" });
}
export default class TextInput extends Vue.with(Prop) {
  defaultClass = ref(
    "text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
  );
  value = "";
  iconedClass = ref("w-32 pl-10 pr-4");
  notIconedClass = ref("mt-1 w-full");
  onInputChanged(e: Event): void {
    this.$emit("updates", (e.target as HTMLInputElement).value);
  }
}
</script>
