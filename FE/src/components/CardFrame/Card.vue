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
        {{ Title }}
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
        :to="hash.to"
        :text="hash.text"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import CardHash from "./CardHash.vue";

interface hashList {
  to?: string;
  text: string;
}

class Prop {
  src = prop<string>({ default: "" });
  alt = prop<string>({ default: "" });
  Title = prop<string>({ default: "" });
  bg_color = prop<string>({ default: "bg-white" });
  hash_tags?: hashList;
}

@Options({ components: { CardHash } })
export default class Card extends Vue.with(Prop) {}
</script>
