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
      <!-- TODO: change to profileImg -->
      <img
        class="object-cover w-full h-full"
        :src="is_signed ? profile_img ?? '' : ''"
        alt="Your avatar"
      />
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
        <slot />
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { prop, Vue } from "vue-class-component";
class Prop {
  is_signed = prop<boolean>({ default: false });
  profile_img = prop<string | null>({ default: null });
}
export default class Menu extends Vue.with(Prop) {
  dropdownOpen = false;
}
</script>
