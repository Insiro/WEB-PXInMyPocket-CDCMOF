<template>
  <div :class="[$slots.default ? iconedFrame : '']">
    <span
      v-if="$slots.default"
      class="absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <slot v-if="$slots.default" class="w-5 h-5 text-gray-500"> </slot>
    </span>
    <input
      v-model="value"
      :class="[defaultClass, $slots.default ? iconedClass : notIconedClass]"
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
  input_type = prop<
    | "text"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "password"
    | "number"
    | "url"
    | "tel"
    | "time"
    | "week"
  >({ default: "text" });
  placeholder = prop<string>({ default: "placeholder" });
  value = prop<string>({ default: "" });
}
export default class TextInput extends Vue.with(Prop) {
  defaultClass = ref(
    "text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
  );
  value = "";
  iconedFrame = ref("relative mx-4 lg:mx-0");
  iconedClass = ref("w-32 pl-10 pr-4");
  notIconedClass = ref("mt-1 w-full");
  onInputChanged(e: Event): void {
    this.$emit("updates", (e.target as HTMLInputElement).value);
  }
}
</script>
