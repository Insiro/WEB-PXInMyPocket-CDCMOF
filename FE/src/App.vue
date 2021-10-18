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
import userState from "./store/User";
import notifyState from "./store/Notifications";
@Options({ components: { Layout, EmptyLayout } })
export default class App extends Vue {
  created(): void {
    postListState.update();
    prodState.refresh();
    userState.refreshSession();
    notifyState.updateNotics();
  }
  get layout(): string {
    return useRoute().meta.noLayout === true ? "EmptyLayout" : "Layout";
  }
}
</script>
