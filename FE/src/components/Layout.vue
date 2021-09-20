<template>
  <SideBar></SideBar>
  <slot></slot>
</template>
<script lang="ts">
import { SideBar } from "./SideBar";
import { Vue, Options } from "vue-class-component";
// import { Pages } from "@/router";
@Options({
  components: { SideBar },
})
export default class Layout extends Vue {}
</script>
