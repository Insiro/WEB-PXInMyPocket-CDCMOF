<template>
  <div
    class="
      modal
      z-50
      fixed
      w-full
      h-full
      top-0
      left-0
      flex
      items-center
      justify-center
    "
    :class="[open ? '' : openStyle]"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      @click="toggleClose()"
    ></div>

    <div
      class="
        z-50
        w-11/12
        mx-auto
        overflow-y-auto
        bg-white
        rounded
        shadow-lg
        modal-container
        md:max-w-md
      "
    >
      <div
        class="
          absolute
          top-0
          right-0
          z-50
          flex flex-col
          items-center
          mt-4
          mr-4
          text-sm text-white
          cursor-pointer
          modal-close
        "
        @click="toggleClose()"
      >
        <Xicon />
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="px-6 py-4 text-left modal-content">
        <!--Title-->
        <div class="flex items-center justify-between pb-3">
          <p class="text-2xl font-bold">{{ title }}</p>
          <div class="z-50 cursor-pointer modal-close" @click="toggleClose()">
            <Xicon />
          </div>
        </div>

        <!--Body-->
        <slot> Modal content. </slot>

        <!--Footer-->
        <div class="flex justify-end pt-2"></div>
        <Button
          :class="footerBtnStyle"
          class="
            p-3
            mr-2
            text-indigo-500
            bg-transparent
            hover:bg-gray-100 hover:text-indigo-400
          "
          @click="toggleClose()"
        >
          Close
        </Button>

        <Button :class="footerBtnStyle" @click="toggleClose()">
          <span>{{ action }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";
import { ref } from "vue";
import { Xicon } from "@/components/Icons";
import { Button } from "@/components/Button";

class Props {
  open = prop<boolean>({ default: true });
  title = prop<string>({ default: "Modal Title" });
  action = prop<string>({ default: "Action" });
}
@Options({ components: { Button, Xicon } })
export default class BaseModal extends Vue.with(Props) {
  openStyle = ref("opacity-0 pointer-events-none");
  footerBtnStyle = ref("px-6 py-3");
  toggleClose(): void {
    this.$emit("close");
  }
}
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
