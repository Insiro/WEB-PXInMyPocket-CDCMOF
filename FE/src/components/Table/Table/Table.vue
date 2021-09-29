<template>
  <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div
      class="
        inline-block
        min-w-full
        overflow-hidden
        align-middle
        border-b border-gray-200
        shadow
        sm:rounded-lg
      "
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <slot name="header">
              <TableHead :clsas="[thClass]">Table</TableHead>
              <TableHead>Header</TableHead>
            </slot>
          </tr>
        </thead>

        <tbody class="bg-white">
          <slot name="body">
            <tr>
              <TableItem>Table</TableItem>
              <TableItem>Item</TableItem>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import TableHead from "../Head";
import TableItem from "../Item";

@Options({ components: { TableHead, TableItem } })
export default class Table extends Vue {
  thClass = ref(
    "text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase"
  );
}
</script>
