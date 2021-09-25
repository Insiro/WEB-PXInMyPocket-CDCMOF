<template>
  <button
    :type="type"
    class="
      flex
      items-center
      px-2
      py-2
      font-medium
      tracking-wide
      text-white
      capitalize
      transition-colors
      duration-200
      transform
      bg-indigo-600
      rounded-md
      hover:bg-indigo-500
      focus:outline-none focus:bg-indigo-500
    "
    @click="onClick"
  >
    <slot v-if="withIcon" name="icon"><Refresh /></slot>
    <span :class="[withIcon ? 'mx-1' : '']">
      <slot name="contents"> Refresh </slot>
    </span>
  </button>
</template>
<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { Refresh } from "@/components/Icons";

class Props {
  type = prop<string>({ default: "button" });
  withIcon = prop<boolean>({ default: false });
}

@Options({
  components: { Refresh },
})
export default class Button extends Vue.with(Props) {
  onClick(): void {
    this.$emit("conClick");
  }
}
</script>
