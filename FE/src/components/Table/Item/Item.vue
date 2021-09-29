<template>
  <td :class="[styleClass]" :colspan="colspan"><slot /></td>
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";
import { ref } from "vue";
class Prop {
  colspan = prop<number>({ default: 1 });
}
export default class Item extends Vue.with(Prop) {
  styleClass = ref("px-6 py-4 border-b border-gray-200 whitespace-nowrap");
}
</script>
