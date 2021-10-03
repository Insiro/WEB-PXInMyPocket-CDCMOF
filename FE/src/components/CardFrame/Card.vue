<template>
  <div
    class="max-w-sm mt-6 overflow-hidden rounded shadow-lg"
    :class="[bg_color]"
  >
    <img
      class="w-full max-h-60"
      style="object-fit: contain"
      :src="src"
      :alt="alt"
    />
    <div class="px-6 py-4">
      <div class="mb-2 text-xl font-bold text-gray-900">
        {{ title }}
      </div>
      <p class="text-base text-gray-700">
        <slot> describe of item </slot>
      </p>
    </div>
    <div v-if="hash_tags !== undefined" class="px-6 pt-4 pb-2">
      <!--hashTag Area-->
      <CardHash
        v-for="hash in hash_tags"
        :key="hash"
        :tag="hash"
        @hash_click="hashClicked"
      >
        {{ hash }}
      </CardHash>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import CardHash from "./CardHash.vue";

class Prop {
  src = prop<string>({ default: "" });
  alt = prop<string>({ default: "" });
  title = prop<string>({ default: "" });
  bg_color = prop<string>({ default: "bg-white" });
  hash_tags?: Array<string>;
  hi_hash = prop<Set<string>>({ default: new Set([]) });
}

@Options({ components: { CardHash } })
export default class Card extends Vue.with(Prop) {
  hashClicked(data: string): void {
    this.$emit("hash_click", data);
  }
}
</script>
