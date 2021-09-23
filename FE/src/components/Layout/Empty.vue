<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class EmptyLayout extends Vue {}
</script>
