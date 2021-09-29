<template>
  <th class="px-6 py-3 bg-gray-100 border-b border-gray-200">
    <slot />
  </th>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class TableHead extends Vue {}
</script>
