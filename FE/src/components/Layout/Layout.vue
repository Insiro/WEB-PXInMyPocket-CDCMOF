<template>
  <div class="flex h-screen bg-gray-200 font-roboto">
    <SideBar />
    <div class="flex-1 flex flex-col overflow-hidden h-screen">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 h-full">
        <div class="container mx-auto px-6 py-8 h-full">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import { SideBar } from "./SideBar";
import Header from "./Header";
import { Vue, Options } from "vue-class-component";

@Options({
  components: { SideBar, Header },
})
export default class Layout extends Vue {}
</script>
