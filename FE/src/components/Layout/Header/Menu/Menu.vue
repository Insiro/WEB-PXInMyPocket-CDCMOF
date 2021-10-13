<template>
  <div class="relative">
    <button
      class="
        relative
        z-10
        block
        w-8
        h-8
        overflow-hidden
        rounded-full
        shadow
        focus:outline-none
      "
      @click="dropdownOpen = !dropdownOpen"
    >
      <slot name="icon"> Icon</slot>
    </button>
    <div
      v-show="dropdownOpen"
      class="fixed inset-0 z-10 w-full h-full"
      @click="dropdownOpen = false"
    ></div>
    <transition
      enter-active-class="transition duration-150 ease-out transform"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="
          absolute
          right-0
          z-20
          w-48
          py-2
          mt-2
          bg-white
          rounded-md
          shadow-xl
        "
      >
        <slot name="menu" />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class Menu extends Vue {
  dropdownOpen = false;
}
</script>
