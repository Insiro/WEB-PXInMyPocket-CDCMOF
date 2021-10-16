<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useRoute } from "vue-router";
import { Layout, EmptyLayout } from "@/components/Layout";
import postListState from "./store/Post/postList";
import prodState from "./store/Prod";
import cartState from "./store/Cart";
import userState from "./store/User";
@Options({ components: { Layout, EmptyLayout } })
export default class App extends Vue {
  created(): void {
    postListState.update();
    prodState.refresh();
    cartState.dumy(10);
    userState.refreshSession();
  }
  get layout(): string {
    return useRoute().meta.noLayout === true ? "EmptyLayout" : "Layout";
  }
}
</script>
