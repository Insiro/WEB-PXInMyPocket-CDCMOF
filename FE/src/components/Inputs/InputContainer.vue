<template>
  <label>
    <sHeader v-if="title !== ''">{{ title }}</sHeader>
    <slot />
  </label>
</template>
<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import { TextInput } from ".";
import { sHeader } from "../Header";

class Prop {
  title = prop<string>({ default: "" });
}

@Options({ components: { sHeader, TextInput } })
export default class InputContainer extends Vue.with(Prop) {}
</script>
