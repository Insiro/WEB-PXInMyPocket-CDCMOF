<template>
  <PgFrame>
    <PgItem text="1" position="left" />
    <PgItem text="2" />
    <PgItem text="3" position="right" />
  </PgFrame>
</template>
<script lang="ts">
import PgFrame from "./Frame.vue";
import PgItem from "./Item.vue";
import { Vue, Options } from "vue-class-component";

@Options({ components: { PgFrame, PgItem } })
export default class PageNation extends Vue {}
</script>
