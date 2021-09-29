<template>
  <div class="flex mr-4 rounded">
    <slot>
      <Item text="item" />
    </slot>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Item from "./Item.vue";
@Options({ components: { Item } })
export default class PgFrame extends Vue {}
</script>
